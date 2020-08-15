import {put, all, call} from 'redux-saga/effects';
import axios from '../../axios';

import * as actions from '../actions';
export function* fetchProductsSaga(action) {
    yield put(actions.fetchProductsStart())
    try {
        const [
            fetchBigPoster,
            fetchNewPoster,
            fetchProducts
        ] = yield all([
            call(axios.get, '/bigposter.json?orderBy="$value"&limitToLast=2&print=pretty'),
            call(axios.get, '/newposter.json?orderBy="$value"&limitToLast=4&print=pretty'),
            call(axios.get, '/products.json?orderBy="$value"&limitToLast=16&print=pretty')
        ])
        const bigPoster = [];
        const newPoster = [];
        const products = [];
        for (let key in fetchBigPoster.data) {
            bigPoster.push({
                ...fetchBigPoster.data[key],
                id: key
            })
        }
        for (let key in fetchNewPoster.data) {
            newPoster.push({
                ...fetchNewPoster.data[key],
                addData:{
                    ...fetchNewPoster.data[key].addData,
                    listImage: fetchNewPoster.data[key].addData.listImage.split(';')
                },
                id: key
            })
        }
        for (let key in fetchProducts.data) {
            products.push({
                ...fetchProducts.data[key],
                colors: fetchProducts.data[key].colors.split(';'),
                image: fetchProducts.data[key].image.split(';'),
                size: fetchProducts.data[key].size.split(';'),
                listImage: fetchProducts.data[key].listImage.split(';'),
                id:key
            })
        }
        yield put(actions.fetchProductsSuccess({
            bigPoster: bigPoster.reverse(),
            newPoster: newPoster.reverse(),
            products: products.reverse()
        }))

    } catch (error) {
        yield put(actions.fetchProductsFail(error.message))
    }
}
