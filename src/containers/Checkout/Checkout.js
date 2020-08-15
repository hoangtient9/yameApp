import React, { Fragment, useCallback, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import CheckoutData from '../../components/CheckoutData/CheckoutData';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/NotFound/NotFound';
import { useHistory } from 'react-router-dom';

const Checkout = props => {

    const dispatch = useDispatch();
    const onGetCheckout = useCallback(() => dispatch(actions.getCheckout()), [dispatch]);

    const checkoutData = useSelector(state => state.checkout.checkout);
    const loading = useSelector(state => state.checkout.loading);
    const history = useHistory();

    useEffect(() => {
      onGetCheckout()
    }, [onGetCheckout])

    const cancellHandler = () => {
        history.goBack()
    }

    let checkout = <Spinner />;

    if (!loading && !checkoutData) {
        checkout = <NotFound>No products found</NotFound>
    }

    if (!loading && checkoutData) {
        checkout = (
            <Fragment>
                <CheckoutData data={checkoutData} cancell={cancellHandler} />
            </Fragment> 
        )
    }

    return checkout
}

export default Checkout;