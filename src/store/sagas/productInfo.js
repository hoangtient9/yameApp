import {put} from 'redux-saga/effects';
import axios from '../../axios';

import * as actions from '../actions';

export function* fetchProductInfoSaga(action) {
    yield put(actions.fetchProductInfoStart())
    try {
        const fetchProduct = yield axios.get(`/products/${action.id}.json`);
        const product = {
            ...fetchProduct.data,
            colors: fetchProduct.data.colors.split(';'),
            image: fetchProduct.data.image.split(';'),
            size: fetchProduct.data.size.split(';'),
            listImage: fetchProduct.data.listImage.split(';'),
            id: action.id
        }
        yield put(actions.fetchProductInfoSuccess(product))
    } catch (error) {
        yield put(actions.fetchProductInfoFail(error.message))
    }
}