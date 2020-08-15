import {put, call, all} from 'redux-saga/effects';
import axios from '../../axios';

import * as actions from '../actions';

export function* fetchSearchSaga(action) {
    try {
        if (action.lastProduct !== null){
            const fetchProducts = yield axios.get(`/products.json?orderBy="${action.key}"&startAt="${action.lastProduct}"&endAt="${action.query}\uf8ff"&once="value"&limitToFirst=9&print=pretty`);
            const newProducts = []
            for (let key in fetchProducts.data) {
                newProducts.push({
                    ...fetchProducts.data[key],
                    colors: fetchProducts.data[key].colors.split(';'),
                    image: fetchProducts.data[key].image.split(';'),
                    size: fetchProducts.data[key].size.split(';'),
                    listImage: fetchProducts.data[key].listImage.split(';'),
                    id:key
                })
            }
            const products = action.oldProducts.concat(newProducts)
            yield put(actions.fetchSearchSuccess(products.length !== 0 ? products : null, null))
            
        } else {
            yield put(actions.fetchSearchStart())
            const [fetchProducts, lastProduct] = yield all([
                call(axios.get, `/products.json?orderBy="${action.key}"&startAt="${action.query}"&endAt="${action.query}\uf8ff"&once="value"&limitToFirst=9&print=pretty`),
                call(axios.get, `/products.json?orderBy="${action.key}"&startAt="${action.query}"&endAt="${action.query}\uf8ff"&once="value"&limitToLast=1&print=pretty`)
            ])
            const products = [];
            let last = {}
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
            for (let key in lastProduct.data){
                last.id = key
                last.name = lastProduct.data[key].name
                last.categorySearch = lastProduct.data[key].categorySearch
            }
            yield put(actions.fetchSearchSuccess(products.length !== 0 ? products : null, 'id' in last ? last : null))
        }
    } catch (error) {
        yield put(actions.fetchSearchFail(error.message))
    }
}