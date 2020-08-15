import React, {useState} from 'react';

import classes from './AddProduct.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {updateObject, checckValidity} from '../../../shared/ultility';
import axios from 'axios';

const AddProduct = props => {

    const [addForm, setAddForm] = useState(
        {
          name: {
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
          price: {
            elementType: 'input',
            elementConfig: {
              type: 'number',
              placeholder: 'Price'
            },
            value: '',
            validation: {
              required: true,
              isNumeric: true
            },
            valid: false,
            touched: false
          },
          colors: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Color'
            },
            value: '',
            validation: {
              required: true,
            },
            valid: false,
            touched: false
          },
          size: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Size'
            },
            value: '',
            validation: {
              required: true,
            },
            valid: false,
            touched: false
          },
          image: {
            elementType: 'textarea',
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
          category: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'T-shirt', displayValue: 'T-shirt'},
                {value: 'Shirt', displayValue: 'Shirt'},
                {value: 'Pant', displayValue: 'Pant'},
                {value: 'Shoe', displayValue: 'Shoe'},
                {value: 'Sandal', displayValue: 'Sandal'},
                {value: 'Balo', displayValue: 'Balo'},

              ]
            },
            value: 'T-shirt',
            valid: true,
            validation: {}
          },
        }
      )
      const [formIsValid, setFormIsValid] = useState(false)

      const addHandler = (event) => {
        event.preventDefault();
    
        const formData = {};
        for (let formElementIdentifier in addForm) {
          formElementIdentifier === 'price' ? formData[formElementIdentifier] = Number(addForm[formElementIdentifier].value) :
          formData[formElementIdentifier] = addForm[formElementIdentifier].value
        }
    
        const add = {
          ...formData,
          date: new Date()
        };

        axios.post(`https://firestore.googleapis.com/v1/projects/chatbot-2bd64/databases/(default)/documents/myShop`, {
          fields: { 
            name: { stringValue: add.name }, 
            created: { timestampValue: new Date() }, 
            modified: { timestampValue: new Date() } 
        }
        })
    
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
        <div className={classes.AddProduct}>
          <h4>Add new Product</h4>
          {form}
        </div>
      )
}

export default AddProduct;