import {takeEvery, all} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {fetchProductsSaga} from './home';
import {fetchSearchSaga} from './search';
import {fetchProductInfoSaga} from './productInfo';
import {getCheckoutSaga, setCheckoutSaga} from './checkout';
import {purchaseProductSaga, fetchOrdersSaga} from './orders';
import {
    logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga, authCheckStateSaga, 
    resetPasswordSaga, 
    authRefreshTokenSaga
} from './auth';

export function* watchProducts() {
    yield takeEvery(actionTypes.FETCH_PRODUCTS, fetchProductsSaga)
}

export function* watchSearch() {
    yield takeEvery(actionTypes.FETCH_SEARCH, fetchSearchSaga)
}

export function* watchProductInfo() {
    yield takeEvery(actionTypes.FETCH_PRODUCT_INFO, fetchProductInfoSaga)
}
export function* watchCheckout() {
    yield takeEvery(actionTypes.GET_CHECKOUT, getCheckoutSaga)
    yield takeEvery(actionTypes.SET_CHECKOUT, setCheckoutSaga)
}
export function* watchOrders() {
    yield takeEvery(actionTypes.PURCHASE_PRODUCT, purchaseProductSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.RESET_PASSWORD, resetPasswordSaga),
        takeEvery(actionTypes.REFRESH_TOKEN, authRefreshTokenSaga)
    ])
}

