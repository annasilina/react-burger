import {TIngredient} from "../types/data";

export const calcOrderCost = (ingredientsInOrder: Array<TIngredient>): number => {
	return ingredientsInOrder.length === 0
		? 0
		: ingredientsInOrder.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.count), 0);
};