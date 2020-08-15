import React from 'react';

import classes from './FooterItems.module.scss';
import FooterItem from './FooterItem/FooterItem';

const FooterItems = props => (
    <div className={classes.FooterItems}>
        <h5>{props.items[0]}</h5>
        <ul>
            {props.items.filter((e, i) => i !== 0).map((item, ind) => <FooterItem key={ind}>{item}</FooterItem>)}
        </ul>
    </div>
)

export default FooterItems;