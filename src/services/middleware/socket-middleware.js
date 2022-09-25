import {getCookie} from '../../utils/cookie';

export const socketMiddleware = (wsUrl, wsActions, auth) => {
	return store => {
		let socket = null;

		return next => action => {
			const { dispatch } = store;
			const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
			const { type, payload } = action;
			const accessToken = getCookie('accessToken');

			if (type === wsInit) {
				socket = auth && accessToken ? new WebSocket(`${wsUrl}?token=${accessToken}`) : new WebSocket(wsUrl);
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
				};

				if (type === wsSendMessage) {
					const message = { ...payload, token: accessToken };
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	};
};