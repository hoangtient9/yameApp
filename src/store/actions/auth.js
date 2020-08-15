import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess  = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRefreshToken = () => {
    return {
        type: actionTypes.REFRESH_TOKEN
    }
}
export const authRefreshTokenSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_REFRESH_TOKEN,
        token: token,
        userId: userId
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const  auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}

export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    }
}
export const resetPasswordSuccess = () => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS
    }
}
export const resetPasswordFail = (error) => {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error
    }
}
export const resetPassword = (email) => {
    return {
        type: actionTypes.RESET_PASSWORD,
        email: email
    }
}