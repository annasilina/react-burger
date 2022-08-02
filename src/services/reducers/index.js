import {combineReducers} from 'redux';
import {ingredientsReducer} from './burger'

const rootReducer = combineReducers({
	burger: ingredientsReducer
});

export {rootReducer}