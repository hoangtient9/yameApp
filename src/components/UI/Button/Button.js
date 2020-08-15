import React from 'react';
import classes from './Button.module.scss';

const button = props => (
  <button 
    className={[classes.Button, classes[props.btnType], classes[props.btnAuth]].join(' ')} 
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
)

export default button;