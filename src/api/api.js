const apiConfig = {
	baseURL: 'https://norma.nomoreparties.space/api',
}

class Api {
	constructor(config) {
		this._url = config.baseURL;
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
		return fetch(`${this._url}/ingredients`).then((res) => this._checkResponse(res));
	}
}

const api = new Api(apiConfig);

export {api}
