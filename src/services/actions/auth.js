import {api} from '../../api/api';
import {setCookie} from '../../utils/cookies';

export const REQUEST_LOADING = 'REQUEST_LOADING'; // общий лоадер для всех запросов

export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAILED = 'REGISTRATION_REQUEST_FAILED';

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';

export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';

export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';


export const registration = (formData) => {
	return function(dispatch) {
		dispatch({
			type: REQUEST_LOADING
		})

		api.registerRequest(formData)
			.then((res) => {
				if (res.success) {
					const accessToken = res.accessToken.split('Bearer ')[1];
					const refreshToken = res.refreshToken;
					setCookie('accessToken', accessToken, {expires: 1200, path: '/'} )
					localStorage.setItem('refreshToken', refreshToken);

					dispatch({
						type: REGISTRATION_REQUEST_SUCCESS,
						user: res.user
					})
				}
			})
			.catch((err) => {
				dispatch({
					type: REGISTRATION_REQUEST_FAILED,
				})
				console.log(err)
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
				dispatch({
					type: GET_AUTH_SUCCESS,
					user: data.user
				})

				const accessToken = data.accessToken.split('Bearer ')[1];
				const refreshToken = data.refreshToken;
				setCookie('accessToken', accessToken, {expires: 1200, path: '/'} )
				localStorage.setItem('refreshToken', refreshToken);

			})
			.catch((err) => {
				dispatch({
					type: GET_AUTH_FAILED
				})
				console.log(err);
			})
	}
}




