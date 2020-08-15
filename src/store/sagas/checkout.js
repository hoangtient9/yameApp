import {put} from 'redux-saga/effects';

import * as actions from '../actions';

export function* getCheckoutSaga(action) {
    try {
        yield actions.getCheckoutStart()
        const checkoutData = yield localStorage.getItem('checkoutData');
        
        yield put(actions.getCheckoutSuccess(JSON.parse(checkoutData)))
    } catch (error) {
        yield put(actions.getCheckoutFail(error))
    }
}
export function* setCheckoutSaga(action) {
    try {
        yield localStorage.setItem('checkoutData', JSON.stringify(action.data));
    } catch (error) {
        yield put(actions.getCheckoutFail(error.message))
    }
}