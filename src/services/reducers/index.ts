import {combineReducers} from 'redux';
import {ingredientsReducer} from './burger-ingredients';
import {orderReducer} from './order-details';
import {constructorReducer} from './constructor';
import {authReducer} from './auth';
import {wsReducer} from './webSocket';
import {wsAuthReducer} from './webSocketAuth';

const rootReducer = combineReducers({
	authData: authReducer,
	ingredientsData: ingredientsReducer,
	orderData: orderReducer,
	constructorData: constructorReducer,
	wsData: wsReducer,
	wsAuthData: wsAuthReducer
});

export {rootReducer};
