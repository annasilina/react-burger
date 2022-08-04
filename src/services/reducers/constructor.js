import {
	CONSTRUCTOR_ADD_ITEM,
	CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_RESET
} from '../actions/constructor';

const initialState = {
	bunSelected: null,
	ingredientsSelected: []
}

export const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case CONSTRUCTOR_ADD_ITEM: {
			if (action.payload.type === 'bun') {
				return {...state, bunSelected: action.payload}
			}
			return {
				...state,
				ingredientsSelected: [...state.ingredientsSelected, action.payload]
			}
		}
		case CONSTRUCTOR_DELETE_ITEM: {
			return {
				...state,
				ingredientsSelected: [
					...state.ingredientsSelected].filter(ingredient => ingredient.constructorID === action.ingredient.constructorID)
			}
		}
		case CONSTRUCTOR_RESET: {
			return initialState
		}
		default:
			return state
	}
}