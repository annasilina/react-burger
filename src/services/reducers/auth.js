import {
	GET_AUTH_FAILED,
	GET_AUTH_SUCCESS, GET_USER_REQUEST_FAILED, GET_USER_REQUEST_SUCCESS,
	REGISTRATION_REQUEST_FAILED,
	REGISTRATION_REQUEST_SUCCESS,
	REQUEST_LOADING
} from '../actions/auth';

const initialState = {
	user: {},
	isLoading: false,
	isRegisterFailed: false
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_LOADING: {
			return {
				...state,
				isLoading: true
			}
		}
		case REGISTRATION_REQUEST_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isRegisterFailed: false,
				registerErrorMessage: ''
			}
		}
		case REGISTRATION_REQUEST_FAILED: {
			return {
				...state,
				isLoading: false,
				isRegisterFailed: true,
				registerErrorMessage: action.payload
			}
		}

		default:
			return state
	}
}
