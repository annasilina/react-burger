import {api} from '../../api/api';
import {cookie} from '../../cookie/cookie';
import {
	GET_AUTH_FAILED,
	GET_AUTH_LOADED,
	GET_AUTH_LOADING,
	GET_FORGOT_PASSWORD_FAILED,
	GET_FORGOT_PASSWORD_LOADING,
	GET_REGISTRATION_FAILED,
	GET_REGISTRATION_LOADED,
	GET_REGISTRATION_LOADING,
	GET_USER_FAILED,
	GET_USER_LOADED,
	GET_USER_LOADING,
	LOGGED_OUT,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_LOADING,
	SET_USER_DATA,
	SET_USER_DATA_FAILED,
	SET_USER_DATA_LOADING
} from '../constants/auth';
import {TUserData} from "../../types/data";
import {AppDispatch, AppThunk} from "../types";
import {TFormValues} from "../../types/TFormValues";

export type TGetRegistrationLoadingAction = {
	readonly type: typeof GET_REGISTRATION_LOADING;
}

export const getRegistrationLoading = (): TGetRegistrationLoadingAction => ({
	type: GET_REGISTRATION_LOADING,
});

export type TGetRegistrationLoadedAction = {
	readonly type: typeof GET_REGISTRATION_LOADED;
}

export const getRegistrationLoaded = (): TGetRegistrationLoadedAction => ({
	type: GET_REGISTRATION_LOADED,
});

export type TGetRegistrationFailedAction = {
	readonly type: typeof GET_REGISTRATION_FAILED;
	message: string;
}

export const getRegistrationFailed = (message: string): TGetRegistrationFailedAction => ({
	type: GET_REGISTRATION_FAILED,
	message,
})

export type TLoggedOutAction = {
	readonly type: typeof LOGGED_OUT;
}

export const setLoggedOut = (): TLoggedOutAction => ({
	type: LOGGED_OUT,
});

export type TGetAuthLoadingAction = {
	readonly type: typeof GET_AUTH_LOADING;
}

export const getAuthLoading = (): TGetAuthLoadingAction => ({
	type: GET_AUTH_LOADING,
});

export type TGetAuthLoadedAction = {
	readonly type: typeof GET_AUTH_LOADED;
}

const getAuthLoaded = (): TGetAuthLoadedAction => ({
	type: GET_AUTH_LOADED,
});

export type TGetAuthFailedAction = {
	readonly type: typeof GET_AUTH_FAILED;
	readonly message: string;
}

export const getAuthFailed = (message: string): TGetAuthFailedAction => ({
	type: GET_AUTH_FAILED,
	message,
})

export type TGetUserLoadingAction = {
	readonly type: typeof GET_USER_LOADING;
}

export const getUserLoading = (): TGetUserLoadingAction => ({
	type: GET_USER_LOADING,
});

export type TGetUserLoadedAction = {
	readonly type: typeof GET_USER_LOADED;
}

export const getUserLoaded = (): TGetUserLoadedAction => ({
	type: GET_USER_LOADED,
});

export type TGetUserFailedAction = {
	readonly type: typeof GET_USER_FAILED;
	readonly message: string;
}

export const getUserFailed = (message: string): TGetUserFailedAction => ({
	type: GET_USER_FAILED,
	message,
})

export type TSetUserDataLoadingAction = {
	readonly type: typeof SET_USER_DATA_LOADING;
	readonly payload: boolean;
}

const setUserDataLoading = (payload: boolean): TSetUserDataLoadingAction => ({
	type: SET_USER_DATA_LOADING,
	payload,
});

export type TSetUserDataAction = {
	readonly type: typeof SET_USER_DATA;
	readonly user: TUserData;
}

export const setUserData = (user: TUserData): TSetUserDataAction => ({
	type: SET_USER_DATA,
	user
})

export type TSetUserDataFailedAction = {
	readonly type: typeof SET_USER_DATA_FAILED;
	readonly message: string;
}

export const setUserDataFailed = (message: string): TSetUserDataFailedAction => ({
	type: SET_USER_DATA_FAILED,
	message,
})

export type TGetForgotPasswordLoadingAction = {
	readonly type: typeof GET_FORGOT_PASSWORD_LOADING;
	readonly payload: boolean;
}

export const getForgotPasswordLoading = (payload: boolean): TGetForgotPasswordLoadingAction => ({
	type: GET_FORGOT_PASSWORD_LOADING,
	payload,
});

export type TGetForgotPasswordFailedAction = {
	readonly type: typeof GET_FORGOT_PASSWORD_FAILED;
	readonly message: string;
}

export const getForgotPasswordFailed = (message: string): TGetForgotPasswordFailedAction => ({
	type: GET_FORGOT_PASSWORD_FAILED,
	message,
})

export type TResetPasswordLoadingAction = {
	readonly type: typeof RESET_PASSWORD_LOADING;
	readonly payload: boolean;
}

export const resetPasswordLoading = (payload: boolean): TResetPasswordLoadingAction => ({
	type: RESET_PASSWORD_LOADING,
	payload
});

export type TResetPasswordFailedAction = {
	readonly type: typeof RESET_PASSWORD_FAILED;
	readonly message: string;
}

export const resetPasswordFailed = (message: string): TResetPasswordFailedAction => ({
	type: RESET_PASSWORD_FAILED,
	message,
})

export type TAuthActions =
	| TGetRegistrationLoadingAction
	| TGetRegistrationLoadedAction
	| TGetRegistrationFailedAction
	| TLoggedOutAction
	| TGetAuthLoadingAction
	| TGetAuthLoadedAction
	| TGetAuthFailedAction
	| TGetUserLoadingAction
	| TGetUserLoadedAction
	| TGetUserFailedAction
	| TSetUserDataLoadingAction
	| TSetUserDataAction
	| TSetUserDataFailedAction
	| TGetForgotPasswordLoadingAction
	| TGetForgotPasswordFailedAction
	| TResetPasswordLoadingAction
	| TResetPasswordFailedAction;


export const registration: AppThunk = (formData: TFormValues) => (dispatch: AppDispatch) => {
	dispatch(getRegistrationLoading());

	return api
		.registerRequest(formData)
		.then((data) => {
			console.log(data);
			dispatch(getRegistrationLoaded());
			cookie.setTokens(data);
			dispatch(setUserData(data.user));
		})
		.catch((err) => {
			dispatch(getRegistrationFailed(err.message));
			console.log(err);
		});
};

export const login: AppThunk = (formData: TFormValues) => (dispatch: AppDispatch) => {
	dispatch(getAuthLoading());

	api
		.loginRequest(formData)
		.then((data) => {
			console.log(data);
			cookie.setTokens(data);
			dispatch(setUserData(data.user));
			dispatch(getAuthLoaded());
		})
		.catch((err) => {
			dispatch(getAuthFailed(err.message));
			console.log(err);
		});
};

// получение данных о пользователе в профиле
export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
	dispatch(getUserLoading());
	const accessToken = cookie.get('accessToken');

	api
		.getUserRequest(accessToken)
		.then((data) => {
			if (data.success) {
				dispatch(setUserData(data.user));
				dispatch(getUserLoaded());
			}
		})
		.catch((err) => {
			dispatch(getUserFailed(err.message));
			console.log(err.message);
		});
};

export const setUser: AppThunk = (formData: TFormValues) => (dispatch: AppDispatch) => {
	dispatch(setUserDataLoading(true));
	const accessToken = cookie.get('accessToken');

	api
		.setUserDataRequest(formData, accessToken)
		.then((data) => {
			if (data.success) {
				dispatch(setUserData(data.user));
			}
		})
		.catch((err) => {
			dispatch(setUserDataFailed(err.message));
			console.log(err);
		})
		.finally(() => dispatch(setUserDataLoading(false)));
};

export const logout: AppThunk = (token: string) => (dispatch: AppDispatch) => {
	api
		.logoutRequest(token)
		.then((data) => {
		console.log(data);
		if (data.success) {
			dispatch(setLoggedOut());
			cookie.delete('accessToken');
			cookie.delete('refreshToken');
		}
	});
};

export const forgotPasswordAction: AppThunk = (email: string) => (dispatch: AppDispatch) => {
	dispatch(getForgotPasswordLoading(true));

	return api
		.forgotPasswordRequest(email)
		.then((data) => {
			console.log(data);
			dispatch(getForgotPasswordLoading(false));
		})
		.catch((err) => {
			dispatch(getForgotPasswordFailed(err.message));
			console.log(err);
		});
};

export const resetPasswordAction: AppThunk = (passwordData: TFormValues) => (dispatch: AppDispatch) => {
	dispatch(resetPasswordLoading(true));

	return api
		.resetPasswordRequest(passwordData)
		.then((data) => {
			console.log(data);
			dispatch(resetPasswordLoading(false));
		})
		.catch((err) => {
			dispatch(resetPasswordFailed(err.message));
			console.log(err);
		});
};