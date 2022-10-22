import {TIngredient} from "../types/data";

export const calcOrderCost = (ingredientsInOrder: Array<TIngredient>): number => {
	// const bunInOrder = ingredientsInOrder.filter(ingredient => ingredient.type === 'bun')[0];
	// const otherIngredients = ingredientsInOrder.filter(ingredient => ingredient.type !== 'bun');
	//
	// const bunCost = bunInOrder === undefined ? 0 : bunInOrder.price * 2;
	//
	// const otherCost = otherIngredients.length === 0
	// 	? 0
	// 	: otherIngredients.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.count), 0);
	//
	// return bunCost + otherCost;

	// const bunInOrder = ingredientsInOrder.filter(ingredient => ingredient.type === 'bun')[0];
	// const otherIngredients = ingredientsInOrder.filter(ingredient => ingredient.type !== 'bun');
	//
	// const bunCost = bunInOrder === undefined ? 0 : bunInOrder.price * 2;

	return ingredientsInOrder.length === 0
		? 0
		: ingredientsInOrder.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.count), 0);
};