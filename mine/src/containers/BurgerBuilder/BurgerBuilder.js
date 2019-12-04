import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseble: false,
        purchasing: false
    }

    updatePurchaseIngredients = (ingredients) => {
        const sum = Object.keys(ingredients)
                        .map(ing => ingredients[ing])
                        .reduce((acc, ele) => acc += ele, 0)
        this.setState({purchaseble: (sum > 0)});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("Purchase Placed ...");
        this.setState({purchasing: false});
    }
    addIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type]++;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });
        this.updatePurchaseIngredients(updatedIngredients);
    }

    removeIngredientHandler = type => {
        if (this.state.ingredients[type] <= 0)
            return;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type]--;
        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });
        this.updatePurchaseIngredients(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} click={this.purchaseCancelHandler}>
                    <OrderSummary
                        cancel={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice} >
                    </OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                    price={this.state.totalPrice} 
                    add={this.addIngredientHandler} 
                    remove={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    purchaseble={!this.state.purchaseble}
                    purchase={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;