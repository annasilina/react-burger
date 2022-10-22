import {cookie} from '../cookie/cookie';
import {TFormValues} from '../types/TFormValues';
import {
	IApicConfig,
	IInitData,
	TApiBaseResponse,
	TApiIngredientsDataResponse,
	TApiUserDataResponse,
	TApiUserDataWithTokensResponse
} from "./types";

const apiConfig: IApicConfig = {
	baseURL: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

class Api {
	private readonly baseURL: string;
	private readonly authURL: string;
	private readonly headers: {
		[key: string]: string;
	}

	constructor(config: IApicConfig) {
		this.baseURL = config.baseURL;
		this.authURL = `${config.baseURL}/auth`;
		this.headers = config.headers;
	}

	// функция проверки ответа на запрос
	private checkResponse = (res: Response) => {
		return res.ok
			? res.json()
			: res.json().then((data) => Promise.reject(data));
	};

	private fetchWithTokenRefresh = (input: string, init: IInitData): Promise<unknown> => {
		return new Promise((resolve, reject) => {
			fetch(input, init)
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						resolve(json);
					} else {
						console.log('try to refresh token');
						const refreshToken = cookie.get('refreshToken');

						if (refreshToken) {
							this.updateTokenRequest(refreshToken)
								.then((data) => {
									cookie.setTokens(data);
									init.headers['Authorization'] = data.accessToken;
									console.log('token updated');
									fetch(input, init)
										.then((res) => resolve(res.json()))
										.catch((err) => reject(err));
								})
								.catch((err) => {
									console.log('failed to update token');
									reject(err);
								});
						} else {
							reject(new Error('no refresh token available'))
						}
					}
				});
		});
	};

	registerRequest = (formData: TFormValues): Promise<TApiUserDataWithTokensResponse> => {
		return fetch(`${this.authURL}/register`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
				name: formData.name,
			}),
		}).then((res) => this.checkResponse(res));
	}

	loginRequest = (formData: TFormValues): Promise<TApiUserDataWithTokensResponse> => {
		return fetch(`${this.authURL}/login`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
			}),
		}).then((res) => this.checkResponse(res));
	};

	getUserRequest = (accessToken: string): Promise<TApiUserDataResponse> => {
		return this.fetchWithTokenRefresh(`${this.authURL}/user`, {
			method: 'GET',
			headers: {
				...this.headers,
				Authorization: `Bearer ${accessToken}`,
			},
		}).then((data) => data as TApiUserDataResponse);
	};

	setUserDataRequest = (userData: TFormValues, accessToken: string): Promise<TApiUserDataResponse> => {
		return this.fetchWithTokenRefresh(`${this.authURL}/user`, {
			method: 'PATCH',
			headers: {
				...this.headers,
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(userData),
		}).then((data) => data as TApiUserDataResponse);
	};

	updateTokenRequest = (refreshToken: string): Promise<TApiUserDataWithTokensResponse> => {
		return fetch(`${this.authURL}/token`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				token: refreshToken,
			}),
		}).then((res) => this.checkResponse(res));
	};

	logoutRequest = (refreshToken: string): Promise<TApiBaseResponse> => {
		return fetch(`${this.authURL}/logout`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				token: refreshToken,
			}),
		}).then((res) => this.checkResponse(res));
	};

	forgotPasswordRequest = (email: string): Promise<TApiBaseResponse> => {
		return fetch(`${this.baseURL}/password-reset`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				email: email,
			}),
		}).then((res) => this.checkResponse(res));
	};

	resetPasswordRequest = (passwordData: TFormValues): Promise<TApiBaseResponse> => {
		return fetch(`${this.baseURL}/password-reset/reset`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				password: passwordData.password,
				token: passwordData.token,
			}),
		}).then((res) => this.checkResponse(res));
	};

	// функция получения данных по ингредиентам
	getIngredientsRequest = (): Promise<TApiIngredientsDataResponse> => {
		return fetch(`${this.baseURL}/ingredients`)
			.then((res) => this.checkResponse(res)
		);
	};

	sendNewOrderRequest = (idArray: Array<string>, accessToken: string) => {
		return this.fetchWithTokenRefresh(`${this.baseURL}/orders`, {
			method: 'POST',
			headers: {
				...this.headers,
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				ingredients: idArray,
			}),
		});
	};
}

const api = new Api(apiConfig);

export {api};