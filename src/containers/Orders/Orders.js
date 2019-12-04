import React from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import { connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {

    componentWillMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
        // axios.get('/orders.json')
        // .then(res => {
        //     const fetchedOrders = [];
        //     for (let key in res.data) {
        //         fetchedOrders.push({
        //             id: key,
        //             ...res.data[key]
        //         })
        //     }
        //     this.setState({loading: false, orders: fetchedOrders})
        // })
        // .catch(err => {
        //     //this.setState({loading: false});
        // })
    }

    render() {
        let orders = <Spinner />
        if(! this.props.loading) { 
            orders = this.props.orders.map(order => {
                return <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
            })
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
);

const mapDispatchToProps = dispatch => (
    {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));