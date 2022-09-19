import {
	GET_AUTH_FAILED, GET_AUTH_LOADED,
	GET_AUTH_LOADING,
	GET_REGISTRATION_FAILED,
	GET_REGISTRATION_LOADED,
	GET_REGISTRATION_LOADING, LOGGED_IN, LOGGED_OUT, SET_USER_DATA

} from '../actions/auth';

const initialState = {
	user: {},
	isLoggedIn: false,
	isRegisterLoading: false,
	isRegisterFailed: false,
	registerErrorMessage: '',
	isAuthLoading: false,
	isAuthFailed: false,
	authErrorMessage: ''
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REGISTRATION_LOADING: {
			return {
				...state,
				isRegisterLoading: true
			}
		}
		case GET_REGISTRATION_LOADED: {
			return {
				...state,
				isRegisterLoading: false,
				isRegisterFailed: false,
				registerErrorMessage: ''
			}
		}
		case GET_REGISTRATION_FAILED: {
			return {
				...state,
				isRegisterFailed: true,
				isRegisterLoading: false,
				registerErrorMessage: action.payload
			}
		}
		case GET_AUTH_LOADING: {
			return {
				...state,
				isAuthLoading: true
			}
		}
		case GET_AUTH_LOADED: {
			return {
				...state,
				isAuthLoading: false,
				isAuthFailed: false,
				authErrorMessage: ''
			}
		}
		case GET_AUTH_FAILED: {
			return {
				...state,
				isGetAuthFailed: true,
				authErrorMessage: action.payload
			}
		}
		case LOGGED_IN: {
			return {
				...state,
				isLoggedIn: true,
			}
		}
		case SET_USER_DATA: {
			return {
				...state,
				user: action.payload,
			}
		}
		case LOGGED_OUT: {
			return initialState
		}
		default:
			return state
	}
}
