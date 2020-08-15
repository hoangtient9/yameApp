import React from 'react';

import classes from './CheckoutData.module.scss';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const CheckoutData = props => (
    <div className={classes.CheckoutData}>
        <div>
            <CheckoutSummary checkout={props.data}/>
        </div>
        <div>
            <ContactData checkout={props.data} cancell={props.cancell}/>
        </div>
    </div>
)

export default CheckoutData;