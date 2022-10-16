import {cookie} from '../../cookie/cookie';
import {api} from '../../api/api';

export const socketMiddleware = (wsUrl, wsActions, auth) => {
	return store => {
		let socket = null;

		return next => action => {
			const { dispatch } = store;
			const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
			const { type, payload } = action;
			let accessToken = cookie.get('accessToken');
			let refreshToken = cookie.get('refreshToken');
			let isConnected = false;
			let reconnectTimer;

			if (type === wsInit) {
				console.log('ws connecting')
				socket = auth ? new WebSocket(`${wsUrl}?token=${accessToken}`) : new WebSocket(wsUrl);
				isConnected = true;
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
					if (isConnected) {
						console.log('try to reconnect')
						reconnectTimer = window.setTimeout(
							() => {
								dispatch({
									type: wsInit
								});
							}, 2000);
					}
				};

				if (type === wsSendMessage) {
					const message = { ...payload, token: accessToken };
					socket.send(JSON.stringify(message));
				}

				if (type === onMessage && payload.message === "Invalid or missing token") {
					console.log('trying to refresh token in webSocket');
					api.updateTokenRequest(refreshToken)
						.then((data) => {
							cookie.setTokens(data);
							accessToken = cookie.get('accessToken');
							refreshToken = cookie.get('accessToken');
							dispatch({ type: wsInit})
							console.log('token updated in webSocket');
						})
				}

				if (onClose && type === onClose && socket) {
					clearTimeout(reconnectTimer);
					isConnected = false;
					socket.close();
				}
			}

			next(action);
		};
	};
};