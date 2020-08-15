import React from 'react';

import classes from './FooterItem.module.scss';

const FooterItem = props => (
    <li className={classes.FooterItem}>
        {props.children}
    </li>
)

export default FooterItem