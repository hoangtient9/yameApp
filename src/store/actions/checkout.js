import * as actionTypes from './actionTypes';

export const getCheckoutStart = () => {
    return {
        type: actionTypes.GET_CHECKOUT_START
    }
}
export const getCheckoutSuccess = (data) => {
    return {
        type: actionTypes.GET_CHECKOUT_SUCCESS,
        data: data
    }
}
export const getCheckoutFail = (error) => {
    return {
        type: actionTypes.GET_CHECKOUT_FAIL,
        error: error
    }
}
export const getCheckout = () => {
    return {
        type: actionTypes.GET_CHECKOUT,
    }
}
export const setCheckout = (data) => {
    return {
        type: actionTypes.SET_CHECKOUT,
        data: data
    }
}