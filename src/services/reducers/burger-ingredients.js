import {
	DECREASE_INGREDIENT,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_LOADED,
	GET_INGREDIENTS_LOADING,
	INCREASE_INGREDIENT,
	RESET_SELECTED_INGREDIENTS,
	SELECT_INGREDIENT_BUN,
} from '../actions/burger-ingredients.js';

const initialState = {
	ingredients: [],
	ingredientsIsLoading: false,
	ingredientsHasError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_LOADING: {
			return {
				...state,
				ingredientsIsLoading: true,
			};
		}
		case GET_INGREDIENTS_LOADED: {
			return {
				...state,
				ingredientsIsLoading: false,
				ingredientsHasError: false,
				ingredients: action.payload,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsIsLoading: false,
				ingredientsHasError: true,
			};
		}
		case INCREASE_INGREDIENT: {
			return {
				...state,
				ingredients: [...state.ingredients].map((ingredient) =>
					ingredient._id === action.payload._id
						? {
							...ingredient,
							count: ++ingredient.count,
						}
						: ingredient
				),
			};
		}
		case DECREASE_INGREDIENT: {
			return {
				...state,
				ingredients: [...state.ingredients].map((ingredient) =>
					ingredient._id === action.payload._id
						? {
							...ingredient,
							count: --ingredient.count,
						}
						: ingredient
				),
			};
		}
		case SELECT_INGREDIENT_BUN: {
			return {
				...state,
				ingredients: [...state.ingredients].map((ingredient) => {
					if (ingredient.type === 'bun') {
						return ingredient._id === action.payload._id
							? {...ingredient, count: 2}
							: {...ingredient, count: 0};
					}
					return {...ingredient};
				}),
			};
		}
		case RESET_SELECTED_INGREDIENTS: {
			return {
				...state,
				ingredients: [...state.ingredients].map((ingredient) => ({
					...ingredient,
					count: 0,
				})),
			};
		}
		default:
			return state;
	}
};
