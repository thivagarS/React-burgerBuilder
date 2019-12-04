import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return  {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
};

const purchaseBurgerFailed = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED
    }
};

const purcgaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purcgaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess( response.data.name, orderData ) );
        })
        .catch(err => {
            purchaseBurgerFailed(err);
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}   
 
const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
};

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders
    }
}

const fetchOrderFailed = () => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    id: key,
                    ...res.data[key]
                })
            };
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFailed());
        })
    }
}