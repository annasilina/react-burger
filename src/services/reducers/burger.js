import {
	GET_INGREDIENTS_LOADING,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR
} from '../actions/burger.js';

const initialState = {
	ingredients: [],
	ingredientsIsLoading: false,
	ingredientsHasError: false,

	bunSelected: {},
	ingredientsSelected: [],

	ingredientDetails: {},

	orderDetails: {},
	orderIsLoading: false,
	orderHasError: false
}

export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_LOADING: {
			return {
				...state,
				ingredientsIsLoading: true,
			}
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredientsIsLoading: false,
				ingredientsHasError: false,
				ingredients: action.ingredients
			}
		}
		case GET_INGREDIENTS_ERROR: {
			return {
				...state,
				ingredientsIsLoading: false,
				ingredientsHasError: true
			}
		}
		default:
			return state
	}
}