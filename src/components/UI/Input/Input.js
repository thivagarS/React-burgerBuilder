import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    const classArr = [];
    classArr.push(classes.InputElement);
    if(props.invalid && props.touched) {
        classArr.push(classes.Invalid)
    }
    let inputElement;
    switch(props.elementType) {
        case('input'):
            inputElement = <input value={props.value} onChange={props.changed} {...props.elementConfig} className={classArr.join(" ")}/>;
            break;
        case('textarea'):
            inputElement = <textarea value={props.value} onChange={props.changed} {...props.elementConfig} className={classArr.join(" ")}/>;
            break;
        case('select'):
            inputElement = (
                <select value={props.value} onChange={props.changed} className={classArr.join(" ")}>
                    {
                        props.elementConfig.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.displayName}
                                </option>
                            )
                        })
                    }
                </select>
            );
            break;
        default:
            console.log('defaultS')
            inputElement = <input value={props.value} onChange={props.changed} {...props.elementConfig} className={classes.InputElement}/>;
            break;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;