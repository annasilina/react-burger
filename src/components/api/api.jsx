export default class Api {
	constructor(options) {
		this._url = options.baseURL;
		this._headers = options.headers;
	}

	// функция проверки ответа на запрос
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`ошибка: ${res.status}`);
	}

	// функция получения данных по ингредиентам
	getIngredients = () => {
		return fetch(`${this._url}/ingredients`, {
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}
}
