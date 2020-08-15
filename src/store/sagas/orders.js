import {put} from 'redux-saga/effects';
import axios from '../../axios';

import * as actions from '../actions';

export function* purchaseProductSaga(action) {
    yield put(actions.purchaseProductStart())
    try {
        const response = yield axios.post('/orders1.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseProductSuccess(response.data.name, action.orderData))
        yield localStorage.removeItem('checkoutData')
        yield put(actions.getCheckout())
    } catch (error) {
        yield put( actions.purchaseProductFail(error) )
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const res = yield axios.get(`/orders1.json${queryParams}`)
        const fetchedOrders= [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id:key
            })
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders.length === 0 ? null : fetchedOrders))
    } catch (error) {
        yield put(actions.fetchOrdersFail(error))
    }
}