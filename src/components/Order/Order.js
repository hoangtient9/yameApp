import React from 'react';

import classes from './Order.module.scss';
import {convertNumber} from '../../shared/ultility'

const Order = props => {
    const listOrders = [];

    for (let key in {...props.data.orderData}) {
        listOrders.push({
            ...props.data.orderData[key],
            index: key
        })
    }

    const list = listOrders.map((el, i) => (
            <div key={i}>
                <p>{el.name}</p>
                <p>{`${el.color} / ${el.size}, ${convertNumber(el.price)}`}</p>
                <p>{`Quantity: ${el.quantity}, totalPrice: ${convertNumber(el.quantity * el.price)}`}</p>
            </div>
    ));
    
    return (
        <div className={classes.Order}>
            <h5>{props.data.id}</h5>
            <div>
                {list}
            </div>
            <p>{`Total: ${convertNumber(listOrders.reduce((a,b) => a + (b.price * b.quantity), 0))}`}</p>
        </div>
    )
}

export default Order;