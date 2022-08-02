import { api } from '../../api/api';

export const GET_INGREDIENTS_LOADING = 'GET_INGREDIENTS_LOADING';
export const GET_INGREDIENTS_LOADED = 'GET_INGREDIENTS_LOADED';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_SELECTED_BUN = 'GET_SELECTED_BUN'
export const GET_SELECTED_INGREDIENTS = 'GET_SELECTED_INGREDIENTS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const RESET_INGREDIENT_DETAILS = 'RESET_INGREDIENT_DETAILS';

export function getIngredients() {
	return function(dispatch) {
		dispatch({
			type: GET_INGREDIENTS_LOADING
		});
		api.getIngredientsRequest()
			.then((res) => {
				dispatch({
					type: GET_INGREDIENTS_LOADED,
					ingredients: res.data,
				});
				dispatch({
					type: GET_SELECTED_BUN,
					bunSelected: res.data.filter(ingredient => ingredient.type === 'bun')[1]
				})
				dispatch({
					type: GET_SELECTED_INGREDIENTS,
					ingredientsSelected: res.data.filter((ingredient) => (ingredient.type !== 'bun' && ingredient.calories % 2 === 0))
				})
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED
				});
				console.log(err)
			})
	}
}