import {v4 as uuid} from 'uuid';

export const calcOrderCost = (bun, other) => {
	let bunCost;

	if (typeof bun !== "object") {
		bun = {};
	}

	if (!Array.isArray(other)) {
		other = [];
	}

	Object.keys(bun).length === 0 ? (bunCost = 0) : (bunCost = bun.price * 2);
	const otherCost = other.length === 0
		? 0
		: other.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.count), 0);

	return bunCost + otherCost;
};

export const getFullIngredientsInfo = (ingredientsList, orderIngredients) => {
	return orderIngredients
		.map((ingredient) => {
			return (ingredient = ingredientsList.filter(({ _id}) => ingredient.includes(_id)))[0]
		}).map((ingredient) => {
			return {...ingredient, uniqID: uuid(), count: 1};
		})
}

export const getFormatDate = (dateString) => {
	const dateData = new Date(Date.parse(dateString));
	const dateTime = dateData.toLocaleTimeString().slice(0, 5);
	const dateTimeZone = dateData.getTimezoneOffset() / -60;

	const todayData = new Date().setHours(24);

	const diff = Math.floor((todayData - dateData) / (1000 * 60 * 60 * 24));

	let weekDay;

	if (diff === 0) {
		weekDay = 'Сегодня'
	} else if (diff === 1) {
		weekDay = 'Вчера'
	} else if (diff < 4) {
		weekDay = `${diff} дня назад`
	} else {
		weekDay = `${dateData.toLocaleDateString().split('/').join('.')}`
	}

	return `${weekDay}, ${dateTime} i-GMT+${dateTimeZone}`;
}