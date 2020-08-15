import React, {useState, useRef, Fragment} from 'react';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import classes from './Auth.module.scss';
import ResetPass from './SignIn/ResetPass/ResetPass';

const Auth = props => {

    const myRef = useRef(null);
    const [show, setShow] = useState(false)

    const SignInHandler = () => {
        myRef.current.style.transform = `translateX(${0}px)`;
        myRef.current.style.transition = `transform 0.4s ease-in-out`;
    }
    const SignUpHandler = () => {
        myRef.current.style.transform = `translateX(-${myRef.current.clientWidth}px)`;
        myRef.current.style.transition = `transform 0.4s ease-in-out`;   
    }

    const resetPassHandler = () => {
        setShow(!show);
    }

    return (
        <Fragment>
            <ResetPass show={show} clicked={resetPassHandler}/>
            <div className={classes.Auth}>
            <div className={classes.nav}>
                <ul className={classes.links}>
                    <li className={classes.signinActive} onClick={SignInHandler}>Sign in</li>
                    <li className={classes.signupInactive} onClick={SignUpHandler}>Sign up</li>
                </ul>
            </div>
            {props.err ? <p>{props.err.message}</p> : null}
            <div>
                <div ref={myRef}>
                    <SignIn clicked={props.clicked} modalHandler={resetPassHandler}/>
                    <SignUp clicked={props.clicked}/>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Auth;