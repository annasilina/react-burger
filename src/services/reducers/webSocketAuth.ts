import {
	WS_CONNECTION_CLOSED_AUTH,
	WS_CONNECTION_ERROR_AUTH,
	WS_CONNECTION_SUCCESS_AUTH,
	WS_GET_MESSAGE_AUTH
} from '../constants/webSocketAuth';
import {TOrder} from "../../types/data";
import {TWebSocketAuthActions} from "../actions/webSocketAuth";

type TWebSocketAuthState = {
	wsConnected: boolean,
	orders: Array<TOrder>,
	error: string | undefined,
}

const initialState: TWebSocketAuthState = {
	wsConnected: false,
	orders: [],
	error: undefined,
}

export const wsAuthReducer = (state = initialState, action: TWebSocketAuthActions): TWebSocketAuthState => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS_AUTH: {
			return {
				...state,
				error: undefined,
				wsConnected: true
			}
		}
		case WS_CONNECTION_ERROR_AUTH: {
			return {
				...state,
				error: action.payload,
				wsConnected: false
			}
		}
		case WS_GET_MESSAGE_AUTH: {
			return {
				...state,
				error: undefined,
				wsConnected: true,
				orders: action.payload.orders.reverse()
			}
		}
		case WS_CONNECTION_CLOSED_AUTH: {
			return  {
				...state,
				error: undefined,
				wsConnected: false
			}
		}
		default:
			return state;
	}
}