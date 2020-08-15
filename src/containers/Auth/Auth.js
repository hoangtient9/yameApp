import React, {useCallback, Fragment, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import AuthCompoment from '../../components/Auth/Auth';
const Auth = memo(props => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error); 
    const isAuthenticated = useSelector(state => state.auth.token != null);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const onAuth = useCallback((email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)), [dispatch]);

    let auth = <AuthCompoment clicked={onAuth} err={error}/>
    if (loading) {
        auth = <Spinner />
    }
    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath}/>
    }
    return (
        <Fragment>
            {authRedirect}
            {auth}
        </Fragment>
    )
})

export default Auth;