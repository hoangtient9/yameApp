import React, {useState} from 'react';

import classes from './SignIn.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {updateObject, checckValidity} from '../../../shared/ultility';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';


const SignIn = props => {

  const [signInForm, setSignInForm] = useState(
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
            required: true
          },
          valid: false,
          touched: false
        }
      }
    );
  
  const [formIsValid, setFormIsValid] = useState(false)

  const signInHandler = event => {
    event.preventDefault();

    props.clicked(signInForm.email.value, signInForm.password.value, false)
  }

  const formChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(signInForm[inputIdentifier], {
      value: event.target.value,
      valid : checckValidity(event.target.value, signInForm[inputIdentifier].validation),
      touched: true
    })
    
    const updatedSignInForm = updateObject(signInForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formValid = true;
    for (let inputIdentifier in updatedSignInForm) {

      formValid = updatedSignInForm[inputIdentifier].valid && formValid;
    }

    setSignInForm(updatedSignInForm)
    setFormIsValid(formValid)
  }
  
  const formElementsArray = [];
  for (let key in signInForm) {
    formElementsArray.push({
      id: key,
      config: signInForm[key]
    })
  }

  const form = (
    <form onSubmit={signInHandler}>

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
      <Button 
        btnType='Success' 
        disabled={!formIsValid && props.checkout !== null}
      >Sign In</Button>
    </form>
  );

  return (
    <div className={classes.SignIn}>
      {form}
      <div className={classes.forgot}>
        <p onClick={props.modalHandler}>Forgot your password?</p>
    </div>
    </div>
  )
}

export default withErrorHandler(SignIn, axios);