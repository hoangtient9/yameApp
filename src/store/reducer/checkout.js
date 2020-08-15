import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/ultility';

const initialState = {
    loading: false,
    checkout: null,
    error: null
}

const getCheckoutStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const getCheckoutSuccess = (state, action) => {
    return updateObject(state, {
        checkout: action.data,
        loading: false
    })
}

const getCheckoutFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.GET_CHECKOUT_START: return getCheckoutStart(state, action)
       case actionTypes.GET_CHECKOUT_SUCCESS: return getCheckoutSuccess(state, action)
       case actionTypes.GET_CHECKOUT_FAIL: return getCheckoutFail(state, action)
       default: return state
    }
}

export default reducer;