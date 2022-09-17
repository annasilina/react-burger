import {
	GET_AUTH_STATUS_FAILED,
	GET_AUTH_STATUS_LOADED,
	GET_AUTH_STATUS_LOADING,
	GET_USER_FAILED,
	GET_USER_LOADED,
	GET_USER_LOADING,
	LOGGED_IN,
	LOGGED_OUT,
	SET_USER_DATA,
	SET_USER_STATUS

} from '../actions/auth';

const initialState = {
	userData: {},

	isUserLoading: false,
	isUserFailed: false,

	isUserStatusChecked: false,

	loggedIn: false,

	isAuthStatusLoading: false,
	isAuthFailed: false,

	forgotPasswordRequested: false,
	forgotPasswordFailed: false
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA: {
			return {
				...state,
				userData: action.payload
			}
		}
		case SET_USER_STATUS: {
			return {
				...state,
				isUserStatusChecked: action.payload
			}
		}
		case GET_USER_LOADING: {
			return {
				...state,
				isUserLoading: true,
			}
		}
		case GET_USER_FAILED: {
			return {
				...state,
				isUserLoading: false,
				isUserFailed: true,
			}
		}
		case GET_USER_LOADED: {
			return {
				...state,
				isUserLoading: false,
				isUserFailed: false,
			}
		}
		case LOGGED_IN: {
			return {
				...state,
				loggedIn: true,
			};
		}
		case LOGGED_OUT: {
			return {
				...state,
				loggedIn: false,
				userData: {}
			};
		}
		case GET_AUTH_STATUS_LOADED: {
			return {
				...state,
				isAuthStatusLoading: false,
				isAuthFailed: false,
			}
		}
		case GET_AUTH_STATUS_LOADING: {
			return {
				...state,
				isAuthStatusLoading: true
			}
		}
		case GET_AUTH_STATUS_FAILED: {
			return {
				...state,
				isAuthStatusLoading: false,
				isAuthFailed: true
			}
		}
		default: {
			return state
		}
	}
}
