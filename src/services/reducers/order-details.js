import {CREATE_ORDER_FAILED, CREATE_ORDER_LOADED, CREATE_ORDER_LOADING} from '../actions/order-details';

const initialState = {
	orderNumber: 0,
	orderIsLoading: false,
	orderHasError: false
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ORDER_LOADING: {
			return {
				...state,
				orderIsLoading: true
			}
		}
		case CREATE_ORDER_LOADED: {
			return {
				...state,
				orderIsLoading: false,
				orderHasError: false,
				orderNumber: action.number,
			}
		}
		case CREATE_ORDER_FAILED: {
			return {
			...state,
			orderIsLoading: false,
			orderHasError: true,
			}
		}
		default:
			return state
	}
}