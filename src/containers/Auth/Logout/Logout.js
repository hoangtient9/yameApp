import React, { useEffect, useCallback } from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { useDispatch} from 'react-redux'

const Logout = props => {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(actions.authLogout()), [dispatch])
    useEffect(() => {
        onLogout()
    }, [onLogout])

    return <Redirect to='/' />
}

export default Logout;