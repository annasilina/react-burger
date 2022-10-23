import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import thunk from 'redux-thunk';

import {rootReducer} from './reducers';
import {socketMiddleware} from './middleware/socket-middleware';
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE
} from "./constants/webSocket";
import {
	WS_CONNECTION_CLOSED_AUTH,
	WS_CONNECTION_ERROR_AUTH,
	WS_CONNECTION_START_AUTH,
	WS_CONNECTION_SUCCESS_AUTH,
	WS_GET_MESSAGE_AUTH,
	WS_SEND_MESSAGE_AUTH
} from "./constants/webSocketAuth";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUrlAuth = "wss://norma.nomoreparties.space/orders"

export interface IWsActions {
	readonly wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_AUTH;
	readonly wsSendMessage: typeof WS_SEND_MESSAGE | typeof WS_SEND_MESSAGE_AUTH;
	readonly onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS_AUTH;
	readonly onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED_AUTH;
	readonly onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR_AUTH;
	readonly onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MESSAGE_AUTH;
}

const wsActions: IWsActions = {
	wsInit: WS_CONNECTION_START,
	wsSendMessage: WS_SEND_MESSAGE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE,
}

const wsActionsAuth: IWsActions = {
	wsInit: WS_CONNECTION_START_AUTH,
	wsSendMessage: WS_SEND_MESSAGE_AUTH,
	onOpen: WS_CONNECTION_SUCCESS_AUTH,
	onClose: WS_CONNECTION_CLOSED_AUTH,
	onError: WS_CONNECTION_ERROR_AUTH,
	onMessage: WS_GET_MESSAGE_AUTH,
}

const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		socketMiddleware(wsUrl, wsActions, false),
		socketMiddleware(wsUrlAuth, wsActionsAuth, true)
	));

export const store = createStore(rootReducer, enhancer);