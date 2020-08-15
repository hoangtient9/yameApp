import * as actionTypes from './actionTypes';

export const fetchProductInfoStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_INFO_START
    }
}
export const fetchProductInfoSuccess = (data) => {
    return {
        type: actionTypes.FETCH_PRODUCT_INFO_SUCCES,
        product: data
    }
}
export const fetchProductInfoFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_INFO_FAIL,
        error: error
    }
}

export const fetchProductInfo = (id) => {
    return {
        type: actionTypes.FETCH_PRODUCT_INFO,
        id: id
    }
}