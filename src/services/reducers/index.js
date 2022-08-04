import {combineReducers} from 'redux';
import {ingredientsReducer} from './burger-ingredients'
import {orderReducer} from './order-details';
import {constructorReducer} from './constructor';
import {ingredientDetailsReducer} from './ingredient-details';

const rootReducer = combineReducers({
	ingredientsData: ingredientsReducer,
	orderData: orderReducer,
	constructorData: constructorReducer,
	detailsData: ingredientDetailsReducer
});

export {rootReducer}