import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem title='Shirt'>Shirt</NavigationItem>
        <NavigationItem title='Pant'>Pant</NavigationItem>
        <NavigationItem title='Shoe'>Shoe</NavigationItem>
        <NavigationItem title='Balo'>Balo</NavigationItem>
        <NavigationItem title='T-shirt'>T-shirt</NavigationItem>
        <NavigationItem title='Sandal'>Sandal</NavigationItem>
    </ul>
)

export default NavigationItems;