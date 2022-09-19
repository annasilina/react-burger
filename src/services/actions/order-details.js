import { api } from '../../api/api'
import {getCookie} from '../../utils/cookie';
import {updateToken} from './auth';

export const CREATE_ORDER_LOADING = 'CREATE_ORDER_LOADING';
export const CREATE_ORDER_LOADED = 'CREATE_ORDER_LOADED';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';

export const createOrder = (orderDetails) => {
	const idArray = orderDetails.map(ingredient => ingredient._id)

	return function(dispatch) {
		dispatch({
			type: CREATE_ORDER_LOADING
		})
		api.sendNewOrderRequest(idArray, getCookie('accessToken'))
			.then((res) => {
				if (res.success) {
					dispatch({
						type: CREATE_ORDER_LOADED,
						number: res.order.number
					})
				} else {
					dispatch(updateToken(localStorage.getItem('refreshToken')))
				}
			})
			.catch((err) => {
				dispatch({
					type: CREATE_ORDER_FAILED
				})
				console.log(err);
			})
	}
}