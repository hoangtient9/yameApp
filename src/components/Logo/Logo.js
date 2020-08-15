import React from 'react';

import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';
import logoImage from '../../assets/images/logo.png';

const logo = () => (
  <div className={classes.Logo}>
    <Link to='/' exact='true'>
      <img src={logoImage} alt='Yame.vn'/>
    </Link>
  </div>
)

export default logo;