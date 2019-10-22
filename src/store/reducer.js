import { combineReducers } from 'redux'

import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import foodReducer from './food/reducer';
import cityReducer from './city/reducer';
import orderReducer from './order/reducer';
import payReducer from './pay/reducer';
import accountReducer from './accounts/reducer';
import discoverReducer from './discover/reducer';


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    food: foodReducer,
    city: cityReducer,
    order: orderReducer,
    pay: payReducer,
    account: accountReducer,
    discover: discoverReducer
});