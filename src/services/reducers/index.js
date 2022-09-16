import {combineReducers} from 'redux';
import {ingredientsReducer} from './burger-ingredients'
import {orderReducer} from './order-details';
import {constructorReducer} from './constructor';

const rootReducer = combineReducers({
	ingredientsData: ingredientsReducer,
	orderData: orderReducer,
	constructorData: constructorReducer,
});

export {rootReducer}