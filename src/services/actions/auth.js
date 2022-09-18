import {api} from '../../api/api';
import {deleteCookie, setCookie} from '../../utils/cookies';

export const SET_USER_DATA = 'SET_USER_DATA';

export const GET_USER_LOADED = 'GET_USER_LOADED';
export const GET_USER_LOADING = 'GET_USER_LOADING';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const SET_USER_STATUS = 'SET_USER_STATUS';

export const GET_AUTH_STATUS_LOADED = 'GET_AUTH_STATUS_LOADED';
export const GET_AUTH_STATUS_LOADING = 'GET_AUTH_STATUS_LOADING';
export const GET_AUTH_STATUS_FAILED = 'GET_AUTH_STATUS_FAILED';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

/*export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';*/

export const register = (registerData) => {
	return function(dispatch) {
		dispatch(getAuthStatusLoading())

		api.registerRequest(registerData)
			.then((res => {
				if (res.success) {
					let accessToken = res.accessToken.split('Bearer ')[1];
					let refreshToken = res.refreshToken;

					if (accessToken) {
						setCookie('accessToken', accessToken, {expires: 1200})
					}

					if (refreshToken) {
						setCookie('refreshToken', refreshToken)
					}
					dispatch(getAuthStatusLoaded());
					dispatch(setUserData(res.user))
				}
			}))
			.catch((err) => {
				dispatch(getAuthStatusFailed())
				console.log(err)
			})
	}
}

export const login = (loginData) => {
	return function(dispatch) {
		dispatch(getAuthStatusLoading())

		api.loginRequest(loginData)
			.then((res) => {
				if (res.success) {
					let accessToken = res.accessToken.split('Bearer ')[1];
					let refreshToken = res.refreshToken;

					if (accessToken) {
						setCookie('accessToken', accessToken, {expires: 1200})
					}

					if (refreshToken) {
						setCookie('refreshToken', refreshToken)
					}

					dispatch(getAuthStatusLoaded());
					dispatch(setUserData(res.user))
					dispatch(getUserLoaded())
					dispatch(loggedIn());
				}
			})
			.catch((err) => {
				dispatch(getAuthStatusFailed());
				dispatch(getUserFailed());
				console.log(err);
			})
	}
}

export const getUserStatus = () => {
	return function(dispatch) {
		dispatch(getUserLoading())

		api.getUserRequest()
			.then((res) => {
				if (res.success) {
					dispatch(setUserData(res.user))
					dispatch(getUserLoaded())
				} else {
					dispatch(updateRefreshToken())
				}
			})
			.catch((err) => {
				dispatch(getUserFailed());
				console.log(err);
			})
	}
}

export const updateUserData = (userData) => {
	return function(dispatch) {
		dispatch(getUserLoading())

		api.updateUserDataRequest(userData)
			.then((res) => {
				if (res.success) {
					dispatch(setUserData(res.user))
					dispatch(getUserLoaded())
				} else {
					dispatch(updateRefreshToken());
				}
			})
			.catch((err) => {
				dispatch(getUserFailed());
				console.log(err);
			})
	}
}

export const logout = () => {
	return function(dispatch) {
		dispatch(getAuthStatusLoading())

		api.logoutRequest()
			.then((res) => {
				if (res.success) {
					dispatch(loggedOut());
					deleteCookie('refreshToken', null, {expires: -1});
					deleteCookie('accessToken', null, {expires: -1});
				}
			})
	}
}

export const updateRefreshToken = () => {
	return function(dispatch) {
		dispatch(setUserStatusChecked(false))

		api.updateTokenRequest()
			.then((res) => {
				if (res.success) {
					let accessToken = res.accessToken.split('Bearer ')[1];
					let refreshToken = res.refreshToken;

					if (accessToken) {
						setCookie('accessToken', accessToken, {expires: 1200})
					}

					if (refreshToken) {
						setCookie('refreshToken', refreshToken);
					}

					dispatch(loggedIn());
					dispatch(setUserStatusChecked(true))
				}
			})
			.catch((err) => {
				dispatch(loggedOut());
				dispatch(setUserStatusChecked(true))
				console.log(err);
			})
	}
}

export const setUserStatusChecked = (status) => {
	return {
		type: SET_USER_STATUS,
		payload: status
	}
}

export const setUserData = (userData) => {
	return {
		type: SET_USER_DATA,
		payload: userData
	}
}

export const getUserLoading = () => {
	return {
		type: GET_USER_LOADING
	}
}

export const getUserLoaded = () => {
	return {
		type: GET_USER_LOADED
	}
}

export const getUserFailed = () => {
	return {
		type: GET_USER_FAILED
	}
}

export const getAuthStatusLoaded = () => {
	return {
		type: GET_AUTH_STATUS_LOADED
	}
}

export const getAuthStatusLoading = () => {
	return{
		type: GET_AUTH_STATUS_LOADING
	}
}

export const getAuthStatusFailed = () => {
	return{
		type: GET_AUTH_STATUS_FAILED
	}
}


export const loggedIn = () => {
	return {
		type: LOGGED_IN
	}
}

export const loggedOut = () => {
	return {
		type: LOGGED_OUT
	}
}


