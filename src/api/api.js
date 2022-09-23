import {getCookie} from '../utils/cookie';
import {setTokenData} from '../utils/token';

const apiConfig = {
	baseURL: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

class Api {
	constructor(config) {
		this._baseURL = config.baseURL;
		this._authURL = `${config.baseURL}/auth`;
		this._headers = config.headers;
	}

	// функция проверки ответа на запрос
	_checkResponse = (res) => {
		return res.ok
			? res.json()
			: res.json().then((data) => Promise.reject(data));
	};

	_fetchWithTokenRefresh = (input, init) => {
		return new Promise((resolve, reject) => {
			fetch(input, init)
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						resolve(json);
					} else {
						console.log('try to refresh token');
						const refreshToken = getCookie('refreshToken');
						this.updateTokenRequest(refreshToken)
							.then((data) => {
								setTokenData(data);
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
					}
				});
		});
	};

	registerRequest(formData) {
		return fetch(`${this._authURL}/register`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
				name: formData.name,
			}),
		}).then((res) => this._checkResponse(res));
	}

	loginRequest = (loginData) => {
		return fetch(`${this._authURL}/login`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: loginData.email,
				password: loginData.password,
			}),
		}).then((res) => this._checkResponse(res));
	};

	getUserRequest = (accessToken) => {
		return this._fetchWithTokenRefresh(`${this._authURL}/user`, {
			method: 'GET',
			headers: {
				...this._headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});
	};

	setUserDataRequest = (userData, accessToken) => {
		return this._fetchWithTokenRefresh(`${this._authURL}/user`, {
			method: 'PATCH',
			headers: {
				...this._headers,
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(userData),
		});
	};

	updateTokenRequest = (refreshToken) => {
		return fetch(`${this._authURL}/token`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				token: refreshToken,
			}),
		}).then((res) => this._checkResponse(res));
	};

	logoutRequest = (refreshToken) => {
		return fetch(`${this._authURL}/logout`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				token: refreshToken,
			}),
		}).then((res) => this._checkResponse(res));
	};

	forgotPasswordRequest = (email) => {
		return fetch(`${this._baseURL}/password-reset`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: email,
			}),
		}).then((res) => this._checkResponse(res));
	};

	resetPasswordRequest = (passwordData) => {
		return fetch(`${this._baseURL}/password-reset/reset`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				password: passwordData.password,
				token: passwordData.token,
			}),
		}).then((res) => this._checkResponse(res));
	};

	// функция получения данных по ингредиентам
	getIngredientsRequest = () => {
		return fetch(`${this._baseURL}/ingredients`).then((res) =>
			this._checkResponse(res)
		);
	};

	sendNewOrderRequest = (idArray, accessToken) => {
		return this._fetchWithTokenRefresh(`${this._baseURL}/orders`, {
			method: 'POST',
			headers: {
				...this._headers,
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
