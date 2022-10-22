import {v4 as uuid} from 'uuid';
import {
	CONSTRUCTOR_ADD_ITEM,
	CONSTRUCTOR_DELETE_ITEM,
	CONSTRUCTOR_REORDER_ITEM,
	CONSTRUCTOR_RESET
} from "../constants/constructor";
import {TIngredient} from "../../types/data";

export interface IAddItemAction {
	readonly type: typeof CONSTRUCTOR_ADD_ITEM;
	readonly ingredient: TIngredient;
}

export interface IDeleteItemAction {
	readonly type: typeof CONSTRUCTOR_DELETE_ITEM;
	readonly ingredient: TIngredient;
}

export interface IReorderItemAction {
	readonly type: typeof CONSTRUCTOR_REORDER_ITEM;
	dragIngredientIndex: number;
	hoverIngredientIndex: number;
}

export interface IConstructorResetAction {
	readonly type: typeof CONSTRUCTOR_RESET;
}

export type TConstructorActions =
	| IAddItemAction
	| IDeleteItemAction
	| IReorderItemAction
	| IConstructorResetAction;

export const deleteIngredientFromConstructor = (ingredient: TIngredient): IDeleteItemAction => {
	return {
		type: CONSTRUCTOR_DELETE_ITEM,
		ingredient
	}
}

export const resetConstructor = (): IConstructorResetAction => {
	return {
		type: CONSTRUCTOR_RESET,
	}
}

export const reorderIngredientsInConstructor = (dragIngredientIndex: number, hoverIngredientIndex: number): IReorderItemAction => {
	return {
		type: CONSTRUCTOR_REORDER_ITEM,
		dragIngredientIndex,
		hoverIngredientIndex
	}
}

export const addIngredientToConstructor = (ingredient: TIngredient): IAddItemAction => {
	return {
		type: CONSTRUCTOR_ADD_ITEM,
		ingredient: {
			...ingredient,
			constructorID: uuid(),
		},
	};
};
