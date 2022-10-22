import {TIngredient} from '../../types/data';
import {
	CONSTRUCTOR_ADD_ITEM,
	CONSTRUCTOR_DELETE_ITEM,
	CONSTRUCTOR_REORDER_ITEM,
	CONSTRUCTOR_RESET
} from '../constants/constructor';
import {TConstructorActions} from "../actions/constructor";

type TConstructorState = {
	bunSelected: TIngredient | null;
	ingredientsSelected: Array<TIngredient>;
}

const initialState: TConstructorState = {
	bunSelected: null,
	ingredientsSelected: [],
};

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
	switch (action.type) {
		case CONSTRUCTOR_ADD_ITEM: {
			if (action.ingredient.type === 'bun') {
				return {...state, bunSelected: action.ingredient};
			}
			return {
				...state,
				ingredientsSelected: [...state.ingredientsSelected, action.ingredient],
			};
		}
		case CONSTRUCTOR_DELETE_ITEM: {
			return {
				...state,
				ingredientsSelected: [...state.ingredientsSelected].filter(
					(ingredient) =>
						ingredient.constructorID !== action.ingredient.constructorID
				),
			};
		}
		case CONSTRUCTOR_REORDER_ITEM: {
			const reorderedIngredients = [...state.ingredientsSelected];
			reorderedIngredients.splice(
				action.hoverIngredientIndex,
				0,
				reorderedIngredients.splice(action.dragIngredientIndex, 1)[0]
			);
			return {
				...state,
				ingredientsSelected: reorderedIngredients,
			};
		}
		case CONSTRUCTOR_RESET: {
			return initialState;
		}
		default:
			return state;
	}
};
