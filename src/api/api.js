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

	registerRequest = (formData) => {
		return fetch(`${this._authURL}/register`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
				name: formData.name
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

	getUserRequest = (token) => {
		return fetch(`${this._authURL}/user`, {
			method: 'GET',
			headers: {
				...this._headers,
				'Authorization': `Bearer ${token}`,
			}
		}).then(res => this._checkResponse(res));
	}

	updateUserDataRequest = (userData, token) => {
		return fetch(`${this._authURL}/user`, {
			method: 'PATCH',
			headers: {
				...this._headers,
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(userData)
		})
	}

	updateTokenRequest = (token) => {
		return fetch(`${this._authURL}/token`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				token: token
			})
		}).then(res => this._checkResponse(res));
	}

	logoutRequest = (token) => {
		return fetch(`${this._authURL}/logout`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				token: token
			})
		}).then(res => this._checkResponse(res));
	}

	// функция получения данных по ингредиентам
	getIngredientsRequest = () => {
		return fetch(`${this._baseURL}/ingredients`).then((res) => this._checkResponse(res));
	}

	sendNewOrderRequest = (idArray) => {
		return fetch(`${this._baseURL}/orders`, {
			method: 'POST',
			headers: {
				...this._headers,
			},
			body: JSON.stringify({
				ingredients: idArray,
			}),
		}).then((res) => this._checkResponse(res));
	}
}

const api = new Api(apiConfig);

export {api}
