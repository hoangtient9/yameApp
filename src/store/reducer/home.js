import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/ultility';

const initialState = {
    loading: false,
    products: null,
    bigPoster: null,
    newPoster: null
}

const fetchProductsStart = (state, action) => {
    return updateObject(state, {loading: true})
}
const fetchProductsSuccess = (state, action) => {
    return updateObject(state, {
        products: action.products,
        bigPoster: action.bigPoster,
        newPoster: action.newPoster,
        loading: false
    })
}

const fetchProductsFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state, action)
       case actionTypes.FETCH_PRODUCTS_SUCCES: return fetchProductsSuccess(state, action)
       case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail(state, action)
       default: return state
    }
}

export default reducer;