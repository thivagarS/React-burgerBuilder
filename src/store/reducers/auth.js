import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirect: '/'
};

const authStart = (state, action) => updateObject(state, {loading: true});

const authSuccess = (state, action) =>{
    return updateObject(state, {
        loading: false,
        error: null,
        token: action.token,
        userId: action.userId,
    })
} 

const authFailed = (state, action) => updateObject(state, {
    loading: false,
    error: action.error
})

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
};

const setAuthRedirect = (state, action) => {
    return updateObject(state, { authRedirect: action.path })
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.AUTH_START) : return authStart(state, action);
        case(actionTypes.AUTH_SUCCESS) : return authSuccess(state, action);
        case(actionTypes.AUTH_FAILED) : return authFailed(state, action);
        case(actionTypes.AUTH_LOGOUT) : return authLogout(state, action);
        case(actionTypes.SET_AUTH_REDIRECT) : return setAuthRedirect(state, action);
        default : return state;
    }
}

export default reducer;