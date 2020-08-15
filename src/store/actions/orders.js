import * as actionTypes from './actionTypes';

export const purchaseProductStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_START
    }
}
export const purchaseProductSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_SUCCESS,
        orderData: orderData,
        id: id
    }
}
export const purchaseProductFail = (error) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_FAIL,
        error: error
    }
}

export const purchaseProduct = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT,
        orderData: orderData,
        token: token
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
}