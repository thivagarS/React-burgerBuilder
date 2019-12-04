import React, { Component } from 'react';

import * as actionCreators from './store/actions/index';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Orders from './containers/Orders/Orders';
// import Checkout from './containers/Checkout/Checkout';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import ('./containers/Checkout/Checkout')
});

const asyncOrder = asyncComponent(() => {
  return import ('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAuthSignIn();
  }

  render () {
    let routes = (
      <Switch>
        <Route path='/checkout' component={asyncCheckout}/>
        <Route path="/orders" component={asyncOrder} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth}/>
        <Redirect to="/" />
      </Switch>
    );
    
    if(!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.token !== null
  }
);

const mapDispatchToProps = dispatch => (
  {
    onTryAuthSignIn: () => dispatch(actionCreators.tryAutoSignIn())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
