import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from '../constants/webSocket';
import {TOrderData} from "../../types/data";
import {TWebSocketActions} from "../actions/webSocket";

type TWebSocketState = {
	wsConnected: boolean,
	orders: Array<TOrderData>,
	total: number | null,
	totalToday: number | null,
	error: string | undefined,
}

const initialState: TWebSocketState = {
	wsConnected: false,
	orders: [],
	total: null,
	totalToday: null,
	error: undefined,
}

export const wsReducer = (state = initialState, action: TWebSocketActions): TWebSocketState => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS: {
			return {
				...state,
				error: undefined,
				wsConnected: true
			}
		}
		case WS_CONNECTION_ERROR: {
			return {
				...state,
				error: action.payload,
				wsConnected: false
			}
		}
		case WS_GET_MESSAGE: {
			return {
				...state,
				error: undefined,
				wsConnected: true,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday
			}
		}
		case WS_CONNECTION_CLOSED: {
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