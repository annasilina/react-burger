import {combineReducers} from 'redux';
import {burgerReducer} from './burger-details'
import {orderReducer} from './order-details';

const rootReducer = combineReducers({
	burger: burgerReducer,
	order: orderReducer
});

export {rootReducer}