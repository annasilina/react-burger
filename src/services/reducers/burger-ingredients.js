import {
	GET_INGREDIENTS_LOADING,
	GET_INGREDIENTS_LOADED,
	GET_INGREDIENTS_FAILED,
} from '../actions/burger-ingredients.js';

const initialState = {
	ingredients: [],
	ingredientsIsLoading: false,
	ingredientsHasError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
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
				ingredients: action.ingredients.map(ingredient => ({...ingredient, count: 0}))
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