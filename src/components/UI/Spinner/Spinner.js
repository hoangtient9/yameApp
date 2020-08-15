import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = () => (
    <div className={classes.Spinner}>
        <div className={classes.Loader}>Loading...</div>
    </div>
)

export default Spinner;