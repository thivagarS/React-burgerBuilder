import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'; 

const Burger = props => {
    let transformedIngredients = Object.keys(props.ingredients).map((ingredient) => {
        return [...Array(props.ingredients[ingredient])].map((_, i) => {
            return <BurgerIngredient key={ingredient + i} type={ingredient} />
        })
    })
    .reduce((acc, el) => {
        return acc.concat(el);
    }, [])
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}; 

export default Burger;