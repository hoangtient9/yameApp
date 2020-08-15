import {useDispatch} from 'react-redux';
import React, { useCallback, Fragment} from 'react';

import classes from './CheckoutSummary.module.scss';
import * as actions from '../../../store/actions/index';
import {convertNumber} from '../../../shared/ultility';

const CheckoutSummary = props => {

    const dispatch = useDispatch();
    const onGetCheckout = useCallback(() => dispatch(actions.getCheckout()), [dispatch]);
    const onSetCheckout = useCallback((data) => dispatch(actions.setCheckout(data)), [dispatch]);

    const updatedCheckoutElement = (id, color, size,  quantity) => {
        const update = props.checkout.map(el => {
            if (el.id === id && el.color === color && el.size === size){
                return {
                    ...el,
                    quantity: quantity
                }
            }
            return el
       })
       onSetCheckout(update)
       onGetCheckout();
    }

    const deleteCheckoutHandler = (id, color, size) => {
       const updated = props.checkout.filter(el => {
            return el.id !== id || ((el.id === id && (el.color !== color || el.color === color) && el.size !== size) || (el.id === id && el.color !== color && (el.size !== size || el.size === size)) )
       })
       onSetCheckout(updated.length !== 0 ? updated : null)
       onGetCheckout();
    }

    const formChangedHandler = (event, id, color, size) => {

        if (!event.target.value) {
            return
        }
        if (event.target.value && event.target.value > 0 && event.target.value <= 100){
            updatedCheckoutElement(id, color, size, +event.target.value)
        }
    }

    const subtractHandle = (id, color, size, quantity) => {
        if(quantity <= 1){
            return
        }
        updatedCheckoutElement(id, color, size, quantity - 1)
    }

    const addHandle = (id, color, size, quantity) => {
        if(+quantity >= 100){
            return
        }
        updatedCheckoutElement(id, color, size, +quantity + 1 <= 100 ? +quantity + 1 : quantity)
    }

    const checkoutElement = (
        <Fragment>
            {props.checkout.map((element, index) => {
                return (
                    <div className={classes.Detail} key={index}>
                        <div className={classes.Image}>
                            <img src={element.image} alt='anh oi' />
                        </div>
                        <div className={classes.Info}>
                            <div>
                                <p>{element.name}</p>
                                <p>
                                    {`${element.color}, ${element.size} / ${convertNumber(element.price)}`}
                                </p>
                            </div>
                            <div>
                                <div>
                                    <button onClick={() => subtractHandle(element.id, element.color, element.size, element.quantity)}>
                                        <span className="material-icons">remove</span>
                                    </button>
                                    <input  
                                        type="number" 
                                        value={element.quantity} 
                                        onChange={(event) => formChangedHandler(event, element.id, element.color, element.size, element.amount)}
                                    />
                                    <button onClick={() => addHandle(element.id, element.color, element.size, element.quantity)}>
                                        <span className="material-icons">add</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p>{`= ${convertNumber(element.price * element.quantity)}`}</p>
                            </div>
                        </div>
                        <div className={classes.Delete}>
                            <button onClick={() => deleteCheckoutHandler(element.id, element.color, element.size)}>
                                <span className="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                )
            })}
        </Fragment>
    )
    
    return (
        <div className={classes.CheckoutSummary}>
            <div className={classes.Title}>
                <h4>checkout details</h4>
            </div>
            {checkoutElement}
            <div className={classes.Amount}>
                <p>{`TOTAL: ${convertNumber(props.checkout.reduce((a,b) => a + (b.price * b.quantity), 0))}`}</p>
            </div>
        </div>
    )
}

export default CheckoutSummary;