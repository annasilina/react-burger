import {
	WS_CONNECTION_CLOSED_AUTH,
	WS_CONNECTION_ERROR_AUTH,
	WS_CONNECTION_START_AUTH,
	WS_CONNECTION_SUCCESS_AUTH,
	WS_GET_MESSAGE_AUTH,
	WS_SEND_MESSAGE_AUTH
} from "../constants/webSocketAuth";

export interface IWSConnectionStartAuthAction {
	readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWSConnectionSuccessAuthAction {
	readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
	readonly payload: any;
}

export interface IWSConnectionErrorAuthAction {
	readonly type: typeof WS_CONNECTION_ERROR_AUTH;
	readonly payload: any;
}

export interface IWSConnectionClosedAuthAction {
	readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
	readonly payload?: any;
}

export interface IWSGetMessageAuthAction {
	readonly type: typeof WS_GET_MESSAGE_AUTH;
	readonly payload: any;
}

export interface IWSSendMessageAuthAction {
	readonly type: typeof WS_SEND_MESSAGE_AUTH;
	readonly payload: any;
}

export type TWebSocketAuthActions =
	| IWSConnectionStartAuthAction
	| IWSConnectionSuccessAuthAction
	| IWSConnectionErrorAuthAction
	| IWSConnectionClosedAuthAction
	| IWSGetMessageAuthAction
	| IWSSendMessageAuthAction;

export const wsConnectionStartAuth = (): IWSConnectionStartAuthAction => {
	return {
		type: WS_CONNECTION_START_AUTH
	}
}

export const wsConnectionCloseAuth = (payload?: any): IWSConnectionClosedAuthAction => {
	return {
		type: WS_CONNECTION_CLOSED_AUTH,
		payload
	}
}


