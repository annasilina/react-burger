import {
	GET_AUTH_FAILED,
	GET_AUTH_LOADED,
	GET_AUTH_LOADING, GET_FORGOT_PASSWORD_FAILED, GET_FORGOT_PASSWORD_LOADING,
	GET_REGISTRATION_FAILED,
	GET_REGISTRATION_LOADED,
	GET_REGISTRATION_LOADING,
	GET_USER_FAILED,
	GET_USER_LOADED,
	GET_USER_LOADING,
	LOGGED_IN,
	LOGGED_OUT,
	SET_USER_DATA, SET_USER_DATA_FAILED, SET_USER_DATA_LOADING
} from '../actions/auth';

const initialState = {
	user: {},
	isLoggedIn: false,
	isRegisterLoading: false,
	isRegisterFailed: false,
	registerErrorMessage: '',
	isAuthLoading: false,
	isAuthFailed: false,
	authErrorMessage: '',
	isUserLoading: false,
	isUserFailed: false,
	userErrorMessage: '',
	isUserDataLoading: false,
	isUserDataFailed: false,
	userDataErrorMessage: '',
	isForgotPasswordLoading: false,
	isForgotPasswordFailed: false,
	forgotPasswordErrorMessage: ''
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
				isAuthLoading: false,
				isAuthFailed: true,
				authErrorMessage: action.payload
			}
		}
		case LOGGED_IN: {
			return {
				...state,
				isLoggedIn: true,
			}
		}
		case SET_USER_DATA_LOADING: {
			return {
				...state,
				isUserDataLoading: action.payload
			}
		}
		case SET_USER_DATA: {
			return {
				...state,
				user: action.payload,
			}
		}
		case SET_USER_DATA_FAILED: {
			return {
				...state,
				isUserDataLoading: false,
				userDataErrorMessage: action.payload
			}
		}
		case GET_USER_LOADING: {
			return {
				...state,
				isUserLoading: true,
			}
		}
		case GET_USER_LOADED: {
			return {
				...state,
				isUserLoading: false,
			}
		}
		case GET_USER_FAILED: {
			return {
				...state,
				isUserLoading: false,
				isUserFailed: true,
				userErrorMessage: action.payload
			}
		}
		case LOGGED_OUT: {
			return initialState
		}
		case GET_FORGOT_PASSWORD_LOADING: {
			return {
				...state,
				isForgotPasswordLoading: action.payload
			}
		}
		case GET_FORGOT_PASSWORD_FAILED: {
			return {
				...state,
				isForgotPasswordLoading: false,
				forgotPasswordErrorMessage: action.payload,
			}
		}
		default:
			return state
	}
}
