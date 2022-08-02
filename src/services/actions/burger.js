import { api } from '../../api/api';

export const GET_INGREDIENTS_LOADING = 'GET_INGREDIENTS_LOADING';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {
	return function(dispatch) {
		dispatch({
			type: GET_INGREDIENTS_LOADING
		});
		api.getIngredientsRequest()
			.then((res) => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_ERROR
				});
				console.log(err)
			})
	}
}