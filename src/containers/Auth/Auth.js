import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    componentDidMount() {
        if(!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirect()
        }
    }

    inputChangeHandler = (event, eleKey) => {
        const updatedAuthData = {...this.state.controls};
        const updatedAuthDataItem = {...this.state.controls[eleKey]};
        updatedAuthDataItem.value = event.target.value;
        updatedAuthData[eleKey] = updatedAuthDataItem;
        this.setState({
            controls: updatedAuthData
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchSignUpModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }
    
    render() {
        let authArr = [];
        for(let key in this.state.controls) {
            authArr.push({
                id: key,
                config: this.state.controls[key]
            })
        };
        let form = (
                authArr.map(element => {
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
                }))
                
        let authRedirect = null;
        
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Success" clicked={this.switchSignUpModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
};

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirect,
        building: state.burgerBuilder.building
    }
)
const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirect : () => dispatch(actionCreators.setAuthRedirect('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);