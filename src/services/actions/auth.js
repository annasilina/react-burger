import {api} from '../../api/api';
import {setTokenData} from '../../utils/token';
import {getCookie} from '../../utils/cookie';

export const REQUEST_LOADING = 'REQUEST_LOADING'; // общий лоадер для всех запросов

export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAILED = 'REGISTRATION_REQUEST_FAILED';

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';

export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';



export const registration = (formData) => {
	return function(dispatch) {
		dispatch({
			type: REQUEST_LOADING
		})

		api.registerRequest(formData)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: REGISTRATION_REQUEST_SUCCESS
					})
				}
			})
			.catch((err) => {
				dispatch({
					type: REGISTRATION_REQUEST_FAILED,
					payload: err.message
				})
				console.log(err.message)
			})
	}
}

export const getAuth = (formData) => {
	return function(dispatch) {
		dispatch({
			type: REQUEST_LOADING
		})

		api.loginRequest(formData)
			.then((data) => {

				setTokenData(data);
				dispatch({
					type: GET_AUTH_SUCCESS,
					payload: data.user
				})
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
		dispatch({
			type: REQUEST_LOADING
		})

		let accessToken = getCookie('accessToken');
		let refreshToken = localStorage.getItem('refreshToken');

		api.getUserRequest(accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA_SUCCESS,
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
				console.log(err.message)
			})
	}
}

export const setUserData = (formData) => {
	return function(dispatch) {
		dispatch({
			type: REQUEST_LOADING
		})

		let accessToken = getCookie('accessToken');
		let refreshToken = localStorage.getItem('refreshToken');

		api.setUserDataRequest(formData, accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA_SUCCESS,
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


export const updateToken = (token) => {
	return function (dispatch) {
		dispatch({
			type: REQUEST_LOADING,
		})

		api.updateTokenRequest(token)
			.then((data) => {
				if (data.success) {
					setTokenData(data);
				}

				dispatch({})
			})
			.catch((err) => {
				dispatch({
					type: UPDATE_TOKEN_FAILED,
					payload: err.message
				})
				dispatch({
					type: LOGOUT
				})
				console.log(err);
			})
	}
}
*/
