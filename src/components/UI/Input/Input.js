import React from 'react';
import classes from './Input.module.scss';

const Input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.InValid)
    }

    switch (props.elementType) {
        case 'input':
            inputElement = props.elementConfig.type === 'radio' ? <input {...props.elementConfig} value={props.value} onChange={props.clicked} checked={props.elementConfig.id === 'home' ? props.checked : !props.checked}/> :
            <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>
            break;
        case 'textarea':
            inputElement = <textarea {...props.elementConfig} className={inputClasses.join(' ')} onChange={props.changed}/>
            break;
        case 'select':
            if (props.elementConfig.options[0].name) {
                inputElement = <select value={props.value} className={inputClasses.join(' ')} onChange={props.changed}>
                    <option value=''>Select the store to receive  the goods</option>
                    {props.elementConfig.options.map((option, index) => (
                        <optgroup key={index} label={option.name}>
                            {option.values.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            } else {
                inputElement = <select value={props.value} className={inputClasses.join(' ')} onChange={props.changed}>
                    {props.elementConfig.options.map((option, index) => (
                        <option key={index} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            }
            break;
        default: inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>
            break;
    }

    return (
        props.elementConfig.type === 'radio' ? 
        <div className={classes.Input}>
            {inputElement}
            <label style={{
                margin: '0 10px'
            }}>{props.name}</label>
        </div>  :
        <div 
            className={classes.Input} 
            style={{
                display: (props.elementType === 'select' && props.checked) || (props.name === 'Address' && !props.checked) ? 'none' : 'block',
            }}>
            <label className={classes.Label}>{props.name === 'Address' ? null : props.name}</label>
            {inputElement}
        </div>
    )
}

export default Input;