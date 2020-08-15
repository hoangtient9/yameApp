import React, { Fragment, useEffect, useCallback, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Products from '../../components/Products/Products';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/NotFound/NotFound';
import Button from '../../components/UI/Button/Button';

const Search = props => {
    const location = useLocation();
    const dispatch = useDispatch();
    const onFetchSearch = useCallback((type, query, oldProducts, lastProduct) => dispatch(actions.fetchSearch(type, query, oldProducts, lastProduct)), [dispatch]);

    const productsData = useSelector(state => state.search.products);
    const lastProductData = useSelector(state => state.search.lastProduct);
    const loading = useSelector(state => state.search.loading);
    const [total, setTotal] = useState(9)

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = param[1];
        }
        onFetchSearch(ingredients.k, ingredients.q, [], null)

        return () => {
            setTotal(9)
        }
    }, [onFetchSearch, location.search])

    const loadMoreHandler = () => {
        setTotal(total + 8)
        const query = new URLSearchParams(location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = param[1];
        }
        onFetchSearch(ingredients.k, ingredients.q, productsData.slice(0, productsData.length-1), ingredients.k === 'categorySearch' ? productsData[productsData.length -1].categorySearch : productsData[productsData.length -1].name)
        document.body.style.overflowAnchor = 'none'
    }

    let search = <Spinner />;

    if (!loading && productsData) {
        const newProducts = productsData.slice(0, productsData.length === 1 ? 1 : productsData.length < total ? productsData.length : productsData.length -1 )
        search = (
            <Fragment>
                <Products data={newProducts.slice(0, 8)}/>
                <Products data={newProducts.slice(8, 10)} big />
                <Products data={newProducts.slice(10, 18)}/>
                <Products data={newProducts.slice(18)} big/>
                <div style={{
                    width: '100%',
                    display: newProducts[newProducts.length -1].id === lastProductData.id ? 'none' : 'block'
                }}>
                    <Button btnType='Success' clicked={loadMoreHandler}>Load More</Button>
                </div>
            </Fragment>
        )
    }

    if (!loading && !productsData) {
        search = <NotFound>No products found</NotFound>
    }
    return search
}

export default withErrorHandler(Search, axios)