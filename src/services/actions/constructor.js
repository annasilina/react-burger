import { v4 as uuid } from 'uuid';

export const CONSTRUCTOR_ADD_ITEM = 'CONSTRUCTOR_ADD_ITEM'
export const CONSTRUCTOR_DELETE_ITEM = 'GET_SELECTED_INGREDIENTS';
export const CONSTRUCTOR_REORDER_ITEM = 'CONSTRUCTOR_REORDER_ITEM';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';

export const addItemConstructor = (ingredient) => {
	return {
		type: CONSTRUCTOR_ADD_ITEM,
		payload: {
			...ingredient,
			constructorID: uuid()
		}
	}
}