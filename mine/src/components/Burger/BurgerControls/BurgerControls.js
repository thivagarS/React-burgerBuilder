import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const burgerControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p><strong>Current Price : {props.price.toFixed(2)}</strong></p>
            {
                controls.map(ing => {
                    return (
                        <BurgerControl 
                            label={ing.label} 
                            key={ing.label} 
                            add={props.add} 
                            remove={props.remove} 
                            type={ing.type} 
                            disabled={props.disabledInfo[ing.type]}
                        />
                    )
                })
            }
            <button className={classes.OrderButton} disabled={props.purchaseble} onClick={props.purchase} >ORDER NOW</button>
        </div>
    );
};   

export default burgerControls;