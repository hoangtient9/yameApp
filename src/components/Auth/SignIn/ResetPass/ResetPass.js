import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux'

import classes from './ResetPass.module.scss';
import Modal from '../../../UI/Modal/Modal';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import {updateObject, checckValidity} from '../../../../shared/ultility';
import * as actions from '../../../../store/actions/index'

const ResetPass = props => {
    const [resetPassForm, setResetPassForm] = useState(
        {
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
        }
    );

    const dispatch = useDispatch();

    const onResetPassword = useCallback(email => dispatch(actions.resetPassword(email)), [dispatch]);

    const resetHandler = event => {
        event.preventDefault();
        onResetPassword(resetPassForm.value)
    }

    const formChangedHandler = event => {

        const updatedFormElement = updateObject(resetPassForm, {
          value: event.target.value,
          valid : checckValidity(event.target.value, resetPassForm.validation),
          touched: true
        })
        setResetPassForm(updatedFormElement)
    };

    let form = (
        <form onSubmit={resetHandler}> 
            <Input 
                elementType={resetPassForm.elementType} 
                elementConfig={resetPassForm.elementConfig} 
                value={resetPassForm.value} 
                changed={formChangedHandler}
                inValid={!resetPassForm.valid}
                shouldValidate={resetPassForm.validation}
                touched={resetPassForm.touched} 
            /> 
            <Button 
                btnType='Success' 
                disabled={!resetPassForm.valid}
            >Submit</Button>
        </form>
      );
    return (
        <Modal show={props.show} modalClose={props.clicked}>
            <div className={classes.ResetPass}>
                {form}
            </div>
        </Modal>
    )
}

export default ResetPass;