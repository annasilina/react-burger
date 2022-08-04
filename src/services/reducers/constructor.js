import {
	GET_SELECTED_BUN,
	GET_SELECTED_INGREDIENTS
} from '../actions/constructor';

const initialState = {
	bunSelected: null,
	ingredientsSelected: []
}

export const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SELECTED_BUN: {
			return {
				...state,
				bunSelected: action.bunSelected
			}
		}
		case GET_SELECTED_INGREDIENTS: {
			return {
				...state,
				ingredientsSelected: action.ingredientsSelected
			}
		}
		default:
			return state
	}
}