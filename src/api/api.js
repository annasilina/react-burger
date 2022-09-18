const apiConfig = {
	baseURL: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	}
}

class Api {
	constructor(config) {
		this._baseURL = config.baseURL;
		this._authURL = `${config.baseURL}/auth`;
		this._headers = config.headers;
	}

	// функция проверки ответа на запрос
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`ошибка: ${res.status}`);
	}

	_getCookie(name) {
		const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	registerRequest = (registerData) => {
		return fetch(`${this._authURL}/register`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: registerData.email,
				password: registerData.password,
				name: registerData.name
			})
		}).then((res) => this._checkResponse(res));
	}

	loginRequest = (loginData) => {
		return fetch(`${this._authURL}/login`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: loginData.email,
				password: loginData.password
			})
		}).then((res) => this._checkResponse(res));
	}

	getUserRequest = () => {
		return fetch(`${this._authURL}/user`, {
			method: 'GET',
			headers: {
				...this._headers,
				'Authorization': `Bearer ${this._getCookie('accessToken')}`,
			}
		}).then(res => this._checkResponse(res));
	}

	updateUserDataRequest = (userData) => {
		return fetch(`${this._authURL}/user`, {
			method: 'PATCH',
			headers: {
				...this._headers,
				'Authorization': `Bearer ${this._getCookie('accessToken')}`,
			},
			body: JSON.stringify(userData)
		})
	}

	updateTokenRequest = () => {
		return fetch(`${this._authURL}/token`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				token: this._getCookie('refreshToken')
			})
		}).then(res => this._checkResponse(res));
	}

	/*logoutRequest = () => {
		return fetch(`${this._authURL}/logout`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				token: this._getCookie('refreshToken')
			})
		}).then(res => this._checkResponse(res));
	}*/

	// функция получения данных по ингредиентам
	getIngredientsRequest = () => {
		return fetch(`${this._baseURL}/ingredients`).then((res) => this._checkResponse(res));
	}

	sendNewOrderRequest = (idArray) => {
		return fetch(`${this._baseURL}/orders`, {
			method: 'POST',
			headers: {
				...this._headers,
				'Authorization': `Bearer ${this._getCookie('accessToken')}`
			},
			body: JSON.stringify({
				ingredients: idArray,
			}),
		}).then((res) => this._checkResponse(res));
	}
}

const api = new Api(apiConfig);

export {api}
