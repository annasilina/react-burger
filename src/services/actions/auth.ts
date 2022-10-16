import {api} from '../../api/api';
import {cookie} from '../../cookie/cookie';
import {
	GET_AUTH_FAILED, GET_AUTH_LOADED, GET_AUTH_LOADING, GET_FORGOT_PASSWORD_FAILED, GET_FORGOT_PASSWORD_LOADING,
	GET_REGISTRATION_FAILED, GET_REGISTRATION_LOADED, GET_REGISTRATION_LOADING,
	GET_USER_FAILED, GET_USER_LOADED, GET_USER_LOADING, LOGGED_OUT, RESET_PASSWORD_FAILED, RESET_PASSWORD_LOADING,
	SET_USER_DATA,
	SET_USER_DATA_FAILED, SET_USER_DATA_LOADING
} from '../constants/auth';



export const registration = (formData) => {
	return (dispatch) => {
		dispatch(getRegistrationLoading());

		return api
			.registerRequest(formData)
			.then((data) => {
				console.log(data);
				if (data.success) {
					dispatch(getRegistrationLoaded());
				} else {
					dispatch({
						type: GET_REGISTRATION_FAILED,
						payload: data.message,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_REGISTRATION_FAILED,
					payload: err.message,
				});
				console.log(err);
			});
	};
};

export const login = (formData) => {
	return dispatch => {
		dispatch(getAuthLoading());

		api
			.loginRequest(formData)
			.then((data) => {
				console.log(data);
				cookie.setTokens(data);
				dispatch({
					type: SET_USER_DATA,
					payload: data.user,
				});
				dispatch(getAuthLoaded());
			})
			.catch((err) => {
				dispatch({
					type: GET_AUTH_FAILED,
					payload: err.message,
				});
				console.log(err);
			});
	};
};

// получение данных о пользователе в профиле
export const getUser = () => {
	return dispatch => {
		dispatch(getUserLoading());
		const accessToken = cookie.get('accessToken');

		api
			.getUserRequest(accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA,
						payload: data.user,
					});
					dispatch(getUserLoaded());
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_FAILED,
					payload: err.message,
				});
				console.log(err.message);
			});
	};
};

export const setUserData = (formData) => {
	return dispatch => {
		dispatch(setUserDataLoading(true));
		const accessToken = cookie.get('accessToken');

		api
			.setUserDataRequest(formData, accessToken)
			.then((data) => {
				if (data.success) {
					dispatch({
						type: SET_USER_DATA,
						payload: data.user,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: SET_USER_DATA_FAILED,
					payload: err.message,
				});
				console.log(err);
			})
			.finally(() => dispatch(setUserDataLoading(false)));
	};
};

export const logout = (token) => {
	return dispatch => {
		api.logoutRequest(token).then((data) => {
			if (data.success) {
				dispatch(setLoggedOut());
				cookie.delete('accessToken');
				cookie.delete('refreshToken');
			}
		});
	};
};

export const forgotPasswordAction = (email) => {
	return dispatch => {
		dispatch(getForgotPasswordLoading(true));

		return api
			.forgotPasswordRequest(email)
			.then((data) => {
				console.log(data);
				dispatch(getForgotPasswordLoading(false));
			})
			.catch((err) => {
				dispatch({
					type: GET_FORGOT_PASSWORD_FAILED,
					payload: err.message,
				});
				console.log(err);
			});
	};
};

export const resetPasswordAction = (passwordData) => {
	return dispatch => {
		dispatch(resetPasswordLoading(true));

		return api
			.resetPasswordRequest(passwordData)
			.then((data) => {
				console.log(data);
				dispatch(resetPasswordLoading(false));
			})
			.catch((err) => {
				dispatch({
					type: RESET_PASSWORD_FAILED,
					payload: err.message,
				});
				console.log(err);
			});
	};
};

export type TResetPasswordLoadingAction = {
	readonly type: typeof RESET_PASSWORD_LOADING;
	readonly payload: boolean;
}

export type TGetRegistrationLoadingAction = {
	readonly type: typeof GET_REGISTRATION_LOADING;
}

export type TGetRegistrationLoadedAction = {
	readonly type: typeof GET_REGISTRATION_LOADED;
}

export type TGetAuthLoadingAction = {
	readonly type: typeof GET_AUTH_LOADING;
}

export type TGetAuthLoadedAction = {
	readonly type: typeof GET_AUTH_LOADED;
}

export type TLoggedOutAction = {
	readonly type: typeof LOGGED_OUT;
}

export type TGetUserLoadingAction = {
	readonly type: typeof GET_USER_LOADING;
}

export type TGetUserLoadedAction = {
	readonly type: typeof GET_USER_LOADED;
}

export type TSetUserDataLoadingAction = {
	readonly type: typeof SET_USER_DATA_LOADING;
	readonly payload: boolean;
}

export type TGetForgotPasswordLoadingAction = {
	readonly type: typeof GET_FORGOT_PASSWORD_LOADING;
	readonly payload: boolean;
}

export type TAuthActions =
	| TResetPasswordLoadingAction
	| TGetRegistrationLoadingAction
	| TGetRegistrationLoadedAction
	| TGetAuthLoadingAction
	| TGetAuthLoadedAction
	| TLoggedOutAction
	| TGetUserLoadingAction
	| TGetUserLoadedAction
	| TSetUserDataLoadingAction
	| TGetForgotPasswordLoadingAction

export const resetPasswordLoading = (payload: boolean): TResetPasswordLoadingAction => ({
	type: RESET_PASSWORD_LOADING,
	payload
});


const getRegistrationLoading = (): TGetRegistrationLoadingAction => ({
		type: GET_REGISTRATION_LOADING,
});

const getRegistrationLoaded = (): TGetRegistrationLoadedAction => ({
	type: GET_REGISTRATION_LOADED,
});

const getAuthLoading = (): TGetAuthLoadingAction => ({
	type: GET_AUTH_LOADING,
});

const getAuthLoaded = (): TGetAuthLoadedAction => ({
	type: GET_AUTH_LOADED,
});

const setLoggedOut = (): TLoggedOutAction => ({
	type: LOGGED_OUT,
});

const getUserLoading = (): TGetUserLoadingAction => ({
	type: GET_USER_LOADING,
});

const getUserLoaded = (): TGetUserLoadedAction => ({
	type: GET_USER_LOADED,
});

const setUserDataLoading = (payload: boolean): TSetUserDataLoadingAction => ({
	type: SET_USER_DATA_LOADING,
	payload,
});

const getForgotPasswordLoading = (payload: boolean): TGetForgotPasswordLoadingAction => ({
	type: GET_FORGOT_PASSWORD_LOADING,
	payload,
});
