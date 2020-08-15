import React, {useEffect, useCallback, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import axios from '../../axios';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/NotFound/NotFound';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = memo(props => {
    const dispatch = useDispatch();
    const onFetchOrders = useCallback((token, userId) => dispatch(actions.fetchOrders(token, userId)), [dispatch]);

    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const loading = useSelector(state => state.orders.loading);
    const ordersData = useSelector(state => state.orders.orders);

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId])

    let orders = <Spinner />;
    if (!loading && ordersData) {
        orders = ordersData.map(order => <Order data={order} key={order.id} />)
    }
    if (!loading && !ordersData) {
        orders = <NotFound>No Orders Found</NotFound>
    }
    return orders
})

export default withErrorHandler(Orders, axios);