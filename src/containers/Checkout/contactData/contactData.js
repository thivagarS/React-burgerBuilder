import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './contactData.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from  '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderData: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your COuntry'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: "fastest", displayName: 'Fastest'},
                        {value: "Cheapest", displayName: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true,
                touched: true,
                validation: {}
            }
        },
        isFormValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, key) => {
        const updatedOrderData = {...this.state.orderData};
        const updatedOrderDataItem = {...updatedOrderData[key]};
        updatedOrderDataItem.value = event.target.value;
        updatedOrderDataItem.valid =  this.checkValidity(updatedOrderDataItem.value, updatedOrderDataItem.validation);
        updatedOrderDataItem.touched = true;
        updatedOrderData[key] = updatedOrderDataItem;
        let formIsValid = true;
        for(let ele in updatedOrderData) {
            formIsValid = updatedOrderData[ele].valid && formIsValid
        }
        this.setState({
            orderData: updatedOrderData,
            isFormValid: formIsValid
        })
    }

    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.orderData) {
            formData[formElementIdentifier] = this.state.orderData[formElementIdentifier].value;
        }
        const orderData = {
            ingredients: {
                ...this.props.ing
            },
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onPurchaseBurger(orderData, this.props.token);
    }

    render() {
        let orderDataArr = [];
        for(let key in this.state.orderData) {
            orderDataArr.push({
                id: key,
                config: this.state.orderData[key]
            })
        };

        let form = (
            <form>
                {orderDataArr.map(element => {
                    return (
                        <Input 
                            key={element.id} 
                            changed={(event) => this.inputChangeHandler(event, element.id)} 
                            elementConfig={element.config.elementConfig}
                            elementType={element.config.elementType}
                            value={element.config.value} 
                            invalid={!element.config.valid}
                            touched={element.config.touched}/>
                    )
                })}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.isFormValid}>ORDER</Button>
            </form>)
        if(this.props.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onPurchaseBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);