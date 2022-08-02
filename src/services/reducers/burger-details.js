import {
	GET_INGREDIENTS_LOADING,
	GET_INGREDIENTS_LOADED,
	GET_INGREDIENTS_FAILED, GET_SELECTED_BUN, GET_SELECTED_INGREDIENTS, SET_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS
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
		case GET_SELECTED_BUN: {
			return {
				...state,
				bunSelected: action.bunSelected
			}
		}
		case GET_SELECTED_INGREDIENTS: {
			return {
				...state,
				ingredientsSelected: action.ingredientsSelected
			}
		}
		case SET_INGREDIENT_DETAILS: {
			return {
				...state,
				ingredientDetails: action.ingredient
			}
		}
		case RESET_INGREDIENT_DETAILS: {
			return {
				...state,
				ingredientDetails: {}
			}
		}
		default:
			return state
	}
}