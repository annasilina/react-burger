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

export const getFullIngredientsWithCount = (ingredientsList, orderIngredients) => {
	const items = getFullIngredientsInfo(ingredientsList, orderIngredients)

	let ingredientsObj = {};

	items.forEach(ingredient => {
		if (ingredientsObj[ingredient._id] === undefined) {
			ingredientsObj[ingredient._id] = ingredient
		} else {
			ingredientsObj[ingredient._id].count++;
		}
	})

	return Object.values(ingredientsObj);
}

