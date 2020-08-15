import React, { useState } from 'react';

import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './ToolbarIcons.module.scss';

const ToolbarIcons = props => {

    const [dropdown, setDropdown] = useState(false)
    const checkoutData = useSelector(state => state.checkout.checkout);
    const isAuthenticated = useSelector(state => state.auth.token != null);

    const dropdownHandler = () => {
        setDropdown(!dropdown)
        setTimeout(() => {
            setDropdown(false)
        }, 3000)
    }

    return (
        <div className={classes.ToolbarIcons}>
            <ul>
                <li onClick={props.show}>
                    <span className="material-icons">search</span>
                </li>
                <li className={classes.dropdown}>{
                        isAuthenticated ? <span className="material-icons" onClick={dropdownHandler}>perm_identity</span> :
                        <Link to='/auth'>
                            <span className="material-icons">perm_identity</span>
                        </Link>
                    }
                    <div className={dropdown ? [classes.dropdownContent, classes.dropdownShow].join(' ') : classes.dropdownContent}
                        onClick={dropdownHandler}>
                        <ul>
                            <li><Link to='/orders'>My Orders</Link></li>
                            <li><Link to='/logout'>Log Out</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to='/checkout'>
                        <span className="material-icons">shopping_bag</span>
                        <div>{checkoutData ? checkoutData.length : 0}</div>
                    </Link>
                </li>
            </ul>
            <div onClick={props.clicked}>
            <span className="material-icons">dehaze</span>
            </div>
        </div>
    )
}

export default ToolbarIcons;