export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsConnectionStart = () => {
	return {
		type: WS_CONNECTION_START
	}
}

export const wsConnectionSuccess = () => {
	return {
		type: WS_CONNECTION_SUCCESS
	}
}

export const wsConnectionError = (err) => {
	return {
		type: WS_CONNECTION_ERROR,
		payload: err
	}
}

export const wsGetMessage = (message) => {
	return {
		type: WS_GET_MESSAGE,
		payload: message
	}
}

export const wsSendMessage = (message) => {
	return {
		type: WS_SEND_MESSAGE,
		payload: message
	}
}

export const wsConnectionClose = () => {
	return {
		type: WS_CONNECTION_CLOSED
	}
}


