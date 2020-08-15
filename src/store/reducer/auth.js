import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/ultility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}
const resetPassStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const resetPassSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null
    })
}

const resetPassFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

const authRefershToken = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.RESET_PASSWORD_START: return resetPassStart(state, action)
        case actionTypes.RESET_PASSWORD_SUCCESS: return resetPassSuccess(state, action)
        case actionTypes.RESET_PASSWORD_FAIL: return resetPassFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        case actionTypes.AUTH_REFRESH_TOKEN: return authRefershToken(state, action)
        default: return state
    }
}

export default reducer;