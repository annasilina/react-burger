import {TIngredient} from "../types/data";

export const getAllIngredientsInOrder = (bunSelected: TIngredient, ingredientsSelected: Array<TIngredient>): Array<TIngredient> => {
	const allIngredientsSelected = [];

	ingredientsSelected.forEach((item) => {
		allIngredientsSelected.push(item);
	});

	allIngredientsSelected.unshift(bunSelected);
	allIngredientsSelected.push(bunSelected);

	return allIngredientsSelected;
}