import {api} from '../../api/api';
import {setTokenData} from '../../utils/token';

export const GET_REGISTRATION_LOADING = 'GET_REGISTRATION_LOADING';
export const GET_REGISTRATION_LOADED = 'GET_REGISTRATION_LOADED';
export const GET_REGISTRATION_FAILED = 'GET_REGISTRATION_FAILED';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const GET_AUTH_LOADING = 'GET_AUTH_SUCCESS';
export const GET_AUTH_LOADED = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';


export const registration = (formData) => {
	return (dispatch) => {
		dispatch(getRegistrationLoading());

		return api.registerRequest(formData)
			.then((data) => {
				if (data.success) {
					dispatch(getRegistrationLoaded());
					dispatch({
						type: SET_USER_DATA,
						payload: data.user
					})
					setTokenData(data);
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
	return function(dispatch) {
		dispatch(getAuthLoading())

		api.loginRequest(formData)
			.then((data) => {
				setTokenData(data);
				dispatch({
					type: SET_USER_DATA,
					payload: data.user
				})
				dispatch(setLoggedIn())
				dispatch(getAuthLoaded())
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

/*
// получение данных о пользователе в профиле
export const getUser = () => {
	return function(dispatch) {
		dispatch(requestStatusCheck(true))

		let accessToken = getCookie('accessToken');
		let refreshToken = localStorage.getItem('refreshToken');

		api.getUserRequest(accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA,
						payload: data.user
					})
				} else {
					dispatch(updateToken(refreshToken));
				}
				dispatch(requestStatusCheck(false))
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_REQUEST_FAILED,
					payload: err.message
				})
				console.log(err.message)
			})
	}
}

export const setUserData = (formData) => {
	return function(dispatch) {
		dispatch(requestStatusCheck(true))
		let accessToken = getCookie('accessToken');
		let refreshToken = localStorage.getItem('refreshToken');

		api.setUserDataRequest(formData, accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA,
						payload: data.user
					})
				} else {
					dispatch(updateToken(refreshToken));
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_REQUEST_FAILED,
					payload: err.message
				})
				console.log(err.message);
			})
	}
}
*/

export const updateToken = (token) => {
	return function (dispatch) {
		api.updateTokenRequest(token)
			.then((data) => {
				if (data.success) {
					setTokenData(data);
					dispatch(setLoggedIn);
				}
			})
			.catch((err) => {
				dispatch(setLoggedOut());
				console.log(err);
			})
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