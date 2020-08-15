import React, { Fragment, useEffect, useCallback, memo } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Poster from '../../components/Products/NewPoster/Poster';
import Products from '../../components/Products/Products';
import BigPoster from '../../components/Products/BigPoster/BigPoster';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/NotFound/NotFound';

const Home = memo(props => {
    const dispatch = useDispatch();
    const onFetchProducts = useCallback(() => dispatch(actions.fetchProducts()), [dispatch]);

    const productsData = useSelector(state => state.home.products);
    const bigPosterData = useSelector(state => state.home.bigPoster);
    const newPosterData = useSelector(state => state.home.newPoster);
    const loading = useSelector(state => state.home.loading);

    useEffect(() => {
        onFetchProducts()
    }, [onFetchProducts])

    let home = <Spinner />;

    if (!loading && bigPosterData && newPosterData && productsData) {
        home = (
            <Fragment>
                <BigPoster link={bigPosterData[0].addData.image}/>
                <Poster data={newPosterData}/>
                <Products data={productsData.slice(0, 8)}/>
                <BigPoster link={bigPosterData[1].addData.image} />
                <Products data={productsData.slice(8)}/>
            </Fragment>
        )
    }

    if (!loading && !bigPosterData) {
        home = (
            <NotFound>some problems</NotFound>
        )
    }

    return home
})

export default withErrorHandler(Home, axios);