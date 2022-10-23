import {api} from '../../api/api';
import {
	DECREASE_INGREDIENT,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_LOADED,
	GET_INGREDIENTS_LOADING,
	INCREASE_INGREDIENT,
	RESET_SELECTED_INGREDIENTS,
	SELECT_INGREDIENT_BUN
} from '../constants/burger-ingredients';
import {TIngredient} from "../../types/data";
import {AppDispatch, AppThunk} from "../types";

export interface IGetIngredientsLoadingAction {
	readonly type: typeof GET_INGREDIENTS_LOADING;
}

export interface IGetIngredientsLoadedAction {
	readonly type: typeof GET_INGREDIENTS_LOADED;
	ingredients: Array<TIngredient>
}

export interface IGetIngredientsFailedAction {
	readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISelectIngredientBunAction {
	readonly type: typeof SELECT_INGREDIENT_BUN;
	selectIngredient: TIngredient;
}

export interface IIncreaseIngredientAction {
	readonly type: typeof INCREASE_INGREDIENT;
	selectIngredient: TIngredient;
}

export interface IDecreaseIngredientAction {
	readonly type: typeof DECREASE_INGREDIENT;
	selectIngredient: TIngredient;
}

export interface IResetSelectedIngredientsAction {
	readonly type: typeof RESET_SELECTED_INGREDIENTS;
}

export type TIngredientsActions =
	| IGetIngredientsLoadingAction
	| IGetIngredientsFailedAction
	| IGetIngredientsLoadedAction
	| ISelectIngredientBunAction
	| IIncreaseIngredientAction
	| IDecreaseIngredientAction
	| IResetSelectedIngredientsAction;

export const getIngredientsLoaded = (ingredients: Array<TIngredient>): IGetIngredientsLoadedAction => ({
		type: GET_INGREDIENTS_LOADED,
		ingredients: ingredients.map((ingredient) => ({...ingredient, count: 0})),
});

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
	type: GET_INGREDIENTS_FAILED,
});

export const getIngredientsLoading = (): IGetIngredientsLoadingAction => ({
	type: GET_INGREDIENTS_LOADING,
});

export const selectIngredientBun = (selectIngredient: TIngredient): ISelectIngredientBunAction => ({
	type: SELECT_INGREDIENT_BUN,
	selectIngredient
});

export const increaseIngredient = (selectIngredient: TIngredient): IIncreaseIngredientAction => ({
	type: INCREASE_INGREDIENT,
	selectIngredient
});

export const decreaseIngredient = (selectIngredient: TIngredient): IDecreaseIngredientAction => ({
	type: DECREASE_INGREDIENT,
	selectIngredient
});

export const resetSelectedIngredients = (): IResetSelectedIngredientsAction => ({
	type: RESET_SELECTED_INGREDIENTS,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
	dispatch(getIngredientsLoading());
	api
		.getIngredientsRequest()
		.then((res) => {
			console.log(res);
			dispatch(getIngredientsLoaded(res.data));
		})
		.catch((err) => {
			dispatch(getIngredientsFailed());
			console.log(err);
		});
}
