import { api } from '../../api/api';

export const GET_INGREDIENTS_LOADING = 'GET_INGREDIENTS_LOADING';
export const GET_INGREDIENTS_LOADED = 'GET_INGREDIENTS_LOADED';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED
				});
				console.log(err)
			})
	}
}