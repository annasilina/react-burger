export const WS_CONNECTION_START_AUTH = 'WS_CONNECTION_START_AUTH';
export const WS_CONNECTION_SUCCESS_AUTH = 'WS_CONNECTION_SUCCESS_AUTH';
export const WS_CONNECTION_ERROR_AUTH = 'WS_CONNECTION_ERROR_AUTH';
export const WS_CONNECTION_CLOSED_AUTH = 'WS_CONNECTION_CLOSED_AUTH';
export const WS_GET_MESSAGE_AUTH = 'WS_GET_MESSAGE_AUTH';
export const WS_SEND_MESSAGE_AUTH = 'WS_SEND_MESSAGE_AUTH';


export const wcConnectionStartAuth = () => {
	return {
		type: WS_CONNECTION_START_AUTH
	}
}

export const wsConnectionSuccessAuth = () => {
	return {
		type: WS_CONNECTION_SUCCESS_AUTH
	}
}

export const wsConnectionErrorAuth = (err) => {
	return {
		type: WS_CONNECTION_ERROR_AUTH,
		payload: err
	}
}

export const wsGetMessageAuth = (message) => {
	return {
		type: WS_GET_MESSAGE_AUTH,
		payload: message
	}
}

export const wsSendMessageAuth = (message) => {
	return {
		type: WS_SEND_MESSAGE_AUTH,
		payload: message
	}
}

export const wcConnectionCloseAuth = () => {
	return {
		type: WS_CONNECTION_CLOSED_AUTH
	}
}


