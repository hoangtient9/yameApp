import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/ultility';

const initialState = {
    loading: false,
    products: null,
    error: null,
    lastProduct: null
}

const fetchSearchStart = (state, action) => {
    return updateObject(state, {loading: true})
}
const fetchSearchSuccess = (state, action) => {
    return updateObject(state, {
        products: action.products,
        loading: false,
        lastProduct: action.last !== null ? action.last : state.lastProduct
    })
}

const fetchSearchFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.FETCH_SEARCH_START: return fetchSearchStart(state, action)
       case actionTypes.FETCH_SEARCH_SUCCES: return fetchSearchSuccess(state, action)
       case actionTypes.FETCH_SEARCH_FAIL: return fetchSearchFail(state, action)
       default: return state
    }
}

export default reducer;