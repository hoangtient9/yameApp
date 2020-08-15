import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/ultility';

const initialState = {
    loading: false,
    product: null,
}

const fetchProductInfoStart = (state, action) => {
    return updateObject(state, {loading: true})
}
const fetchProductInfoSuccess = (state, action) => {
    return updateObject(state, {
        product: action.product,
        loading: false
    })
}

const fetchProductInfoFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.FETCH_PRODUCT_INFO_START: return fetchProductInfoStart(state, action)
       case actionTypes.FETCH_PRODUCT_INFO_SUCCES: return fetchProductInfoSuccess(state, action)
       case actionTypes.FETCH_PRODUCT_INFO_FAIL: return fetchProductInfoFail(state, action)
       default: return state
    }
}

export default reducer;