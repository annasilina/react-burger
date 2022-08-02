import {
	GET_INGREDIENTS_LOADING,
	GET_INGREDIENTS_LOADED,
	GET_INGREDIENTS_FAILED
} from '../actions/burger-details.js';

const initialState = {
	ingredients: [],
	ingredientsIsLoading: false,
	ingredientsHasError: false,

	bunSelected: {},
	ingredientsSelected: [],

	ingredientDetails: {},
}

export const burgerReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_LOADING: {
			return {
				...state,
				ingredientsIsLoading: true,
			}
		}
		case GET_INGREDIENTS_LOADED: {
			return {
				...state,
				ingredientsIsLoading: false,
				ingredientsHasError: false,
				ingredients: action.ingredients
			}
		}
		case GET_INGREDIENTS_FAILED: {
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