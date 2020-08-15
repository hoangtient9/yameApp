import React from 'react';
import classes from './NotFound.module.scss';

const NotFound = props => (
    <div className={classes.NotFound}>
        <h4>{props.children}</h4>
    </div>
)

export default NotFound;