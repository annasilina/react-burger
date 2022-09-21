import {combineReducers} from 'redux';
import {ingredientsReducer} from './burger-ingredients';
import {orderReducer} from './order-details';
import {constructorReducer} from './constructor';
import {authReducer} from './auth';

const rootReducer = combineReducers({
	authData: authReducer,
	ingredientsData: ingredientsReducer,
	orderData: orderReducer,
	constructorData: constructorReducer,
});

export {rootReducer};
