import {
	CREATE_ORDER_FAILED,
	CREATE_ORDER_LOADED,
	CREATE_ORDER_LOADING,
	RESET_ORDER_DETAILS
} from '../constants/order-details';
import {TCreateOrderActions} from "../actions/order-details";

type TOrderDetailsState = {
	orderNumber: number;
	orderIsLoading: boolean;
	orderHasError: boolean;
}

const initialState: TOrderDetailsState = {
	orderNumber: 0,
	orderIsLoading: false,
	orderHasError: false,
};

export const orderReducer = (state = initialState, action: TCreateOrderActions) => {
	switch (action.type) {
		case CREATE_ORDER_LOADING: {
			return {
				...state,
				orderIsLoading: true,
			};
		}
		case CREATE_ORDER_LOADED: {
			return {
				...state,
				orderIsLoading: false,
				orderHasError: false,
				orderNumber: action.number,
			};
		}
		case CREATE_ORDER_FAILED: {
			return {
				...state,
				orderIsLoading: false,
				orderHasError: true,
			};
		}
		case RESET_ORDER_DETAILS: {
			return initialState;
		}
		default:
			return state;
	}
};
