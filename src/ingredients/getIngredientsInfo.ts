import {v4 as uuid} from "uuid";
import {TIngredient} from "../types/data";

export const getIngredientsInfo = (allIngredientsList: Array<TIngredient>, orderIngredients: Array<string>): Array<TIngredient> => {
	const newIngredients: Array<TIngredient> = [];

	orderIngredients.forEach(orderIngredient => {
		newIngredients.push(allIngredientsList.filter(({_id}) => orderIngredient.includes(_id))[0]);
	})

	return newIngredients.map((newIngredient) => {
		return {...newIngredient, uniqID: uuid(), count: 1}
	})
}