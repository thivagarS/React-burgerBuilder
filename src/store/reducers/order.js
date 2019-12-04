import * as actionTypes from '../actions/actionTypes';
import { updateObject } from  '../utility';

const initialState = {
    orders: [],
    purchased: false,
    loading: false
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {loading: false});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.id});
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat({newOrder})
    })
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true})
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    })
}

const fetchOrderFailed = (state, action) => {
    return updateObject(state, { loading: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state, action);
        case(actionTypes.PURCHASE_BURGER_FAILED): return purchaseBurgerFailed(state, action);
        case(actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action);
        case(actionTypes.PURCHASE_INIT): return purchaseInit(state, action);
        case(actionTypes.FETCH_ORDER_START): return fetchOrderStart(state, action);
        case(actionTypes.FETCH_ORDER_SUCCESS): return fetchOrderSuccess(state, action);
        case(actionTypes.FETCH_ORDER_FAILED): return fetchOrderFailed(state, action);
        default: return state;
    }
}

export default reducer;