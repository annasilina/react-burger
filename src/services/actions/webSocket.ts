import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE
} from "../constants/webSocket";

export interface IWSConnectionStartAction {
	readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccessAction {
	readonly type: typeof WS_CONNECTION_SUCCESS;
	readonly payload: any;
}

export interface IWSConnectionErrorAction {
	readonly type: typeof WS_CONNECTION_ERROR;
	readonly payload: any;
}

export interface IWSConnectionClosedAction {
	readonly type: typeof WS_CONNECTION_CLOSED;
	readonly payload?: any;
}

export interface IWSGetMessageAction {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: any;
}

export interface IWSSendMessageAction {
	readonly type: typeof WS_SEND_MESSAGE;
	readonly payload: any;
}

export type TWebSocketActions =
	| IWSConnectionStartAction
	| IWSConnectionSuccessAction
	| IWSConnectionErrorAction
	| IWSConnectionClosedAction
 	| IWSGetMessageAction
	| IWSSendMessageAction;

export const wsConnectionStart = (): IWSConnectionStartAction => {
	return {
		type: WS_CONNECTION_START
	}
}

export const wsConnectionClose = (payload?: any): IWSConnectionClosedAction => {
	return {
		type: WS_CONNECTION_CLOSED,
		payload
	}
}


