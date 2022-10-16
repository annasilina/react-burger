import {getIngredientsInfo} from "./getIngredientsInfo";
import {TIngredient} from "../types/data";

export const getIngredientsWithCount = (allIngredientsList: Array<TIngredient>, orderIngredients: Array<string>): Array<TIngredient> => {
	const items: Array<TIngredient> = getIngredientsInfo(allIngredientsList, orderIngredients);

	const ingredientsObj: {
		[key: string]: TIngredient
	} = {};

	items.forEach(ingredient => {
		if (ingredientsObj[ingredient._id] === undefined) {
			ingredientsObj[ingredient._id] = ingredient
		} else {
			ingredientsObj[ingredient._id].count++;
		}
	})

	return Object.values(ingredientsObj);
}