import React, {useState} from 'react';

import classes from './AddPoster.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {updateObject, checckValidity} from '../../../shared/ultility';
import axios from 'axios';

const AddPoster = props => {

    const [addForm, setAddForm] = useState(
        {
          title: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Name Product'
            },
            value: '',
            validation: {
              required: true,
              minLength: 5,
              maxLength: 200
            },
            valid: false,
            touched: false
          },
          image: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Image URL'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          listImage: {
            elementType: 'textarea',
            elementConfig: {
              type: 'text',
              placeholder: 'List Image'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
        }
      )
      const [formIsValid, setFormIsValid] = useState(false)

      const addHandler = (event) => {
        event.preventDefault();
    
        const formData = {};
        for (let formElementIdentifier in addForm) {
          formData[formElementIdentifier] = addForm[formElementIdentifier].value
        }
    
        const add = {
          addData: formData,
        };

        axios.post('https://chatbot-2bd64.firebaseio.com/newposter.json', add)
    
      }

      const formChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(addForm[inputIdentifier], {
          value: event.target.value,
          valid : checckValidity(event.target.value, addForm[inputIdentifier].validation),
          touched: true
        })
        
        const updatedOrderForm = updateObject(addForm, {
          [inputIdentifier]: updatedFormElement
        });
    
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
          formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
    
        setAddForm(updatedOrderForm)
        setFormIsValid(formIsValid)
      }
    
      const formElementsArray = [];
      for (let key in addForm) {
        formElementsArray.push({
          id: key,
          config: addForm[key]
        })
      }

      let form = (
        <form onSubmit={addHandler}>
          {formElementsArray.map(formElement =>   
              <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} 
                changed={event => formChangedHandler(event, formElement.id)}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}/> 
          )}
          <Button btnType='Success' disabled={!formIsValid}>Add</Button>
        </form>
      )

      return (
        <div className={classes.AddPoster}>
          <h4>Add new Poster</h4>
          {form}
        </div>
      )
}

export default AddPoster;