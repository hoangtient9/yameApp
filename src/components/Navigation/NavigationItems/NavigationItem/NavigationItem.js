import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem} >
            <NavLink 
                to={`/search?k=categorySearch&q=${props.title}`} 
                activeClassName={classes.active} 
                isActive={(match, location) => {
                    if(!match) return false
                    return `${location.pathname}${location.search}` === `/search?k=deliveryMethod&q=${props.title}`
                }}>{props.children}
            </NavLink>
        </li>
    )
}

export default NavigationItem;