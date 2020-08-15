import {put, delay, call, all} from 'redux-saga/effects';
import axios from 'axios';
import {key} from '../../key';

import * as actions from '../actions';

export function* logoutSaga() {
    yield all([
        call([localStorage, 'removeItem'], 'idToken'),
        call([localStorage, 'removeItem'], 'refreshToken'),
        call([localStorage, 'removeItem'], 'userId'),
        call([localStorage, 'removeItem'], 'expirationDate')
    ])
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    // yield put(actions.authLogout())
    yield put(actions.authRefreshToken())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;
    }

    try {
            const response = yield axios.post(url, authData)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem('idToken', response.data.idToken);
            yield localStorage.setItem('refreshToken', response.data.refreshToken);
            yield localStorage.setItem('expirationDate', expirationDate)
            yield localStorage.setItem('userId', response.data.localId)
            yield put(actions.authSuccess(response.data.idToken, response.data.localId))
            yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } 
    catch(error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('idToken');
    if (!token) {
        yield put(actions.authLogout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            // yield put(actions.authLogout())
            yield put(actions.authRefreshToken())
        } else {
            const userId = localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
export function* resetPasswordSaga(action) {
    yield put(actions.resetPasswordStart())
    try {
        const reset = {
            email: action.email,
            requestType: 'PASSWORD_RESET'
        }
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + key;
        const response = yield axios.post(url, reset)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('idToken', response.data.idToken);
        yield localStorage.setItem('refreshToken', response.data.refreshToken);
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.resetPasswordSuccess(response.data))
    } catch (error) {
        yield put(actions.resetPasswordFail(error))
    }
}

export function* authRefreshTokenSaga(action) {
    const refreshToken = yield localStorage.getItem('refreshToken');
    const authData = {
        Grant_type : 'refresh_token',
        refresh_token: refreshToken
    }
    const url = 'https://securetoken.googleapis.com/v1/token?key=' + key;

    try {   
        if (!refreshToken) {
            yield put(actions.authLogout())
        } else {
            const response = yield axios.post(url, authData)
            yield put(actions.authRefreshTokenSuccess(response.data.idToken, response.data.localId))
        }
    } 
    catch(error) {
        // yield put(actions.authFail(error.response.data.error))
        yield put(actions.authLogout())
    }
}