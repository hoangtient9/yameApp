import * as actionTypes from './actionTypes';

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}
export const fetchProductsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCES,
        products: data.products,
        bigPoster: data.bigPoster,
        newPoster: data.newPoster,
    }
}
export const fetchProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    }
}

export const fetchProducts = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS
    }
}

