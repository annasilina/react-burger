import {v4 as uuid} from 'uuid';
import {TIngredient} from "../types/TIngredient";

export const getFullIngredientsInfo = (allIngredientsList: Array<TIngredient>, orderIngredients: Array<string>): Array<TIngredient> => {
	const newIngredients: Array<TIngredient> = [];

	orderIngredients.forEach(orderIngredient => {
		newIngredients.push(allIngredientsList.filter(({ _id}) => orderIngredient.includes(_id))[0]);
	})

	return newIngredients.map((newIngredient) => {
		return {...newIngredient, uniqID: uuid(), count: 1}
	})
}

export const getFullIngredientsWithCount = (allIngredientsList: Array<TIngredient>, orderIngredients: Array<string>): Array<TIngredient> => {
	const items: Array<TIngredient> = getFullIngredientsInfo(allIngredientsList, orderIngredients);

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

