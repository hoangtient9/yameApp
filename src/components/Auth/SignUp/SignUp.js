import React, {useState} from 'react';

import classes from './SignUp.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {updateObject, checckValidity} from '../../../shared/ultility';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const SignUp = props => {

  const [signUpForm, setSignUpForm] = useState(
    {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        label: 'Email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        label: 'Password',
        validation: {
          required: true,
          isPassword: true
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password'
        },
        value: '',
        label: 'Confirm Password',
        validation: {
          required: true,
          isPassword: true
        },
        valid: false,
        touched: false
      }
    }
  );
    
  const [formIsValid, setFormIsValid] = useState(false)

  const signUpHandler = event => {
    event.preventDefault();
    props.clicked(signUpForm.email.value, signUpForm.password.value, true)
  }

  const formChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(signUpForm[inputIdentifier], {
      value: event.target.value,
      valid : inputIdentifier === 'confirmPassword' ? checckValidity(event.target.value, signUpForm[inputIdentifier].validation, signUpForm.password.value): checckValidity(event.target.value, signUpForm[inputIdentifier].validation),
      touched: true
    })
    
    const updatedSignUpForm = updateObject(signUpForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formValid = true;
    for (let inputIdentifier in updatedSignUpForm) {

      formValid = updatedSignUpForm[inputIdentifier].valid && formValid;
    }

    setSignUpForm(updatedSignUpForm)
    setFormIsValid(formValid)
  }
    
  const formElementsArray = [];
  for (let key in signUpForm) {
    formElementsArray.push({
      id: key,
      config: signUpForm[key]
    })
  }

  const passwordCheck = (
    <div className={classes.passwordCheck}>
      <p>Password must contain the following:</p>
      <ul>
        <li>A lowercase letter</li>
        <li>A capital (uppercase) letter</li>
        <li>A number letter</li>
        <li>A special character</li>
        <li>Minimum 8 characters</li>
      </ul>
    </div>
  );

  const form = (
    <form onSubmit={signUpHandler}>

      {formElementsArray.map(formElement =>   
          <Input 
            name={formElement.config.label}
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            changed={event => formChangedHandler(event, formElement.id)}
            inValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          /> 
      )}
      {
        (signUpForm.password.touched && !signUpForm.password.valid) ||
        (signUpForm.confirmPassword.touched && !signUpForm.confirmPassword.valid) ? passwordCheck : null
      }
      <Button 
        btnType='Success' 
        disabled={!formIsValid && props.checkout !== null}
      >Sign Up</Button>
    </form>
  )

  return (
    <div className={classes.SignUp}>
      {form}
    </div>
  )
}

export default withErrorHandler(SignUp, axios);