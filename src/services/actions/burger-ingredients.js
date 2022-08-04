import { api } from '../../api/api';

export const GET_INGREDIENTS_LOADING = 'GET_INGREDIENTS_LOADING';
export const GET_INGREDIENTS_LOADED = 'GET_INGREDIENTS_LOADED';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SELECT_INGREDIENT_BUN = 'SELECT_INGREDIENT_BUN';
export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';
export const RESET_SELECTED_INGREDIENTS = 'RESET_SELECTED_INGREDIENTS';

const getIngredientsLoaded = (ingredients) => {
	return {
		type: GET_INGREDIENTS_LOADED,
		payload: ingredients.map(ingredient => ({...ingredient, count: 0}))
	}
}

export function getIngredients() {
	return function(dispatch) {
		dispatch({
			type: GET_INGREDIENTS_LOADING
		});
		api.getIngredientsRequest()
			.then((res) => {
				dispatch(getIngredientsLoaded(res.data));
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED
				});
				console.log(err)
			})
	}
}