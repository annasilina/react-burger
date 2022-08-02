import { api } from '../../api/api'

export const CREATE_ORDER_LOADING = 'CREATE_ORDER_LOADING';
export const CREATE_ORDER_LOADED = 'CREATE_ORDER_LOADED';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const createOrder = (orderDetails) => {
	return function(dispatch) {
		dispatch({
			type: CREATE_ORDER_LOADING
		})
		api.sendNewOrderRequest(orderDetails)
			.then((res) => {
				dispatch({
					type: CREATE_ORDER_LOADED,
					number: res.order.number
				})
			})
			.catch((err) => {
				dispatch({
					type: CREATE_ORDER_FAILED
				})
				console.log(err);
			})
	}
}