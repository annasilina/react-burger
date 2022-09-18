import {
	GET_AUTH_FAILED,
	GET_AUTH_SUCCESS,
	REGISTRATION_REQUEST_FAILED,
	REGISTRATION_REQUEST_SUCCESS,
	REQUEST_LOADING
} from '../actions/auth';

const initialState = {
	user: {},
	isLoading: false,
	isSuccess: false,
	isAuth: false,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_LOADING: {
			return {
				...state,
				isLoading: true,
			}
		}
		case REGISTRATION_REQUEST_SUCCESS: {
			return {
				...state,
				user: action.user,
				isSuccess: true,
				isAuth: true,
				isLoading: false
			}
		}
		case REGISTRATION_REQUEST_FAILED: {
			return  {
				...state,
				isSuccess: false,
				isAuth: false,
				isLoading: false
			}
		}
		case GET_AUTH_SUCCESS: {
			return {
				...state,
				user: action.user,
				isSuccess: true,
				isAuth: true,
				isLoading: false
			}
		}
		case GET_AUTH_FAILED: {
			return  {
				...state,
				isLoading: false,
				isSuccess: false,
				isAuth: false
			}
		}
		default:
			return state
	}
}
