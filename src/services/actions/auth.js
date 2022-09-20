import {api} from '../../api/api';
import {setTokenData} from '../../utils/token';
import {deleteCookie, getCookie} from '../../utils/cookie';

export const GET_REGISTRATION_LOADING = 'GET_REGISTRATION_LOADING';
export const GET_REGISTRATION_LOADED = 'GET_REGISTRATION_LOADED';
export const GET_REGISTRATION_FAILED = 'GET_REGISTRATION_FAILED';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const GET_AUTH_LOADING = 'GET_AUTH_LOADING';
export const GET_AUTH_LOADED = 'GET_AUTH_LOADED';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const GET_USER_LOADING = 'GET_USER_LOADING';
export const GET_USER_LOADED = 'GET_USER_LOADED';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const SET_USER_DATA_LOADING = 'SET_USER_DATA_LOADING';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';

export const GET_FORGOT_PASSWORD_LOADING = 'GET_FORGOT_PASSWORD_LOADING';
export const GET_FORGOT_PASSWORD_FAILED = 'GET_FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

export const registration = (formData) => {
	return (dispatch) => {
		dispatch(getRegistrationLoading());

		return api.registerRequest(formData)
			.then((data) => {
				if (data.success) {
					dispatch(getRegistrationLoaded());
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_REGISTRATION_FAILED,
					payload: err.message
				})
				console.log(err)
			})
	}
}

export const login = (formData) => {
	return function (dispatch) {
		dispatch(getAuthLoading())

		api.loginRequest(formData)
			.then((data) => {
				setTokenData(data);
				dispatch({
					type: SET_USER_DATA,
					payload: data.user
				})
				dispatch(getAuthLoaded());
				dispatch(setLoggedIn());
			})
			.catch((err) => {
				dispatch({
					type: GET_AUTH_FAILED,
					payload: err.message
				})
				console.log(err);
			})
	}
}

// получение данных о пользователе в профиле
export const getUser = () => {
	return function (dispatch) {
		dispatch(getUserLoading());

		let accessToken = getCookie('accessToken');

		api.getUserRequest(accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA,
						payload: data.user
					})
					dispatch(getUserLoaded());
					dispatch(setLoggedIn());
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_FAILED,
					payload: err.message
				})
				console.log(err.message)
			})
	}
}

export const setUserData = (formData) => {
	return function(dispatch) {
		dispatch(setUserDataLoading(true));
		let accessToken = getCookie('accessToken');

		api.setUserDataRequest(formData, accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA,
						payload: data.user
					})
				}
			})
			.catch((err) => {
				dispatch({
					type: SET_USER_DATA_FAILED,
					payload: err.message
				})
				console.log(err.message);
			})
			.finally(() => dispatch(setUserDataLoading(false)))
	}
}

export const logout = (token) => {
	return function (dispatch) {
		api.logoutRequest(token)
			.then((data) => {
				if (data.success) {
					dispatch(setLoggedOut());
					deleteCookie('accessToken');
					localStorage.clear();
				}
			})
	}
}

export const updateToken = (token) => {
	return function (dispatch) {
		return api.updateTokenRequest(token)
			.then((data) => {
				if (data.success) {
					setTokenData(data);
					dispatch(setLoggedIn());
				}
			})
			.catch((err) => {
				dispatch(setLoggedOut());
				console.log(err);
			})
	}
}

export const forgotPasswordAction = (email) => {
	return function (dispatch) {
		dispatch(getForgotPasswordLoading(true))

		return api.forgotPasswordRequest(email)
			.then((data) => {
				console.log(data);
				dispatch(getForgotPasswordLoading(false))
			})
			.catch((err) => {
				dispatch({
					type: GET_FORGOT_PASSWORD_FAILED,
					payload: err.message
				})
				console.log(err);
			})
	}
}

export const resetPasswordAction = (passwordData) => {
	return function (dispatch) {
		dispatch(resetPasswordLoading(true))

		return api.resetPasswordRequest(passwordData)
			.then((data) => {
				console.log(data);
				dispatch(resetPasswordLoading(false))
			})
			.catch((err) => {
				dispatch({
					type: RESET_PASSWORD_FAILED,
					payload: err.message
				})
				console.log(err);
			})
	}
}

export const resetPasswordLoading = (payload) => {
	return {
		type: RESET_PASSWORD_LOADING,
		payload
	}
}

const getRegistrationLoading = () => {
	return {
		type: GET_REGISTRATION_LOADING
	}
}
const getRegistrationLoaded = () => {
	return {
		type: GET_REGISTRATION_LOADED
	}
}

const getAuthLoading = () => {
	return {
		type: GET_AUTH_LOADING
	}
}

const getAuthLoaded = () => {
	return {
		type: GET_AUTH_LOADED
	}
}

const setLoggedIn = () => {
	return {
		type: LOGGED_IN
	}
}

const setLoggedOut = () => {
	return {
		type: LOGGED_OUT
	}
}

const getUserLoading = () => {
	return {
		type: GET_USER_LOADING
	}
}

const getUserLoaded = () => {
	return {
		type: GET_USER_LOADED
	}
}

const setUserDataLoading = (payload) => {
	return {
		type: SET_USER_DATA_LOADING,
		payload
	}
}

const getForgotPasswordLoading = (payload) => {
	return {
		type: GET_FORGOT_PASSWORD_LOADING,
		payload
	}
}

