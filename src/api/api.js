const apiConfig = {
	baseURL: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	}
}

class Api {
	constructor(config) {
		this._url = config.baseURL;
		this._headers = config.headers;
	}

	// функция проверки ответа на запрос
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`ошибка: ${res.status}`);
	}

	// функция получения данных по ингредиентам
	getIngredientsRequest = () => {
		return fetch(`${this._url}/ingredients`).then((res) => this._checkResponse(res));
	}

	sendNewOrderRequest = (IDs) => {
		return fetch(`${this._url}/orders`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				ingredients: IDs,
			}),
		}).then((res) => this._checkResponse(res));
	}
}

const api = new Api(apiConfig);

export {api}
