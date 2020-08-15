import React, { Fragment, useCallback, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProductDetail from '../../components/ProductDetail/ProductDetail';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ProductInfo = props => {

    const history = useHistory();
    const dispatch = useDispatch();
    const onFetchProduct = useCallback((id) => dispatch(actions.fetchProductInfo(id)), [dispatch]);
    const onGetCheckout = useCallback(() => dispatch(actions.getCheckout()), [dispatch]);
    const onSetCheckout = useCallback((data) => dispatch(actions.setCheckout(data)), [dispatch]);

    const productInfoData = useSelector(state => state.productInfo.product);
    const checkoutData = useSelector(state => state.checkout.checkout);
    const loading = useSelector(state => state.productInfo.loading);

    useEffect(() => {
        onFetchProduct(props.match.params.id)
        onGetCheckout()
    }, [onFetchProduct, props.match.params.id, onGetCheckout])

    const addToCard = (data) => {
        if (checkoutData) {
            let checkout = [...checkoutData];

            let check = false;

            for(const el of checkoutData){
               check = el.id === data.id && el.color === data.color && el.size === data.size
            }

            if (check){
                checkout = checkoutData.map((element) => {
                    if (element.id === data.id && element.color === data.color && element.size === data.size){
                        return {
                            ...element,
                            amount: element.amount + 1
                        }
                    }
                    return element;
                })  
            }
            if(!check) {
                checkout.push(data)
            }
            onSetCheckout(checkout)
        } else {
            onSetCheckout([data])
        }
        onGetCheckout()
        history.push('/checkout')
    }

    let productInfo = <Spinner />;

    if (!loading && productInfoData) {
        productInfo = (
            <Fragment>
                <ProductDetail data={productInfoData} clicked={addToCard}/>
            </Fragment>
        )
    }
    return productInfo
}

export default withErrorHandler(ProductInfo, axios)