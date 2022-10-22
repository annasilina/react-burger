import {api} from '../../api/api';
import {cookie} from '../../cookie/cookie';
import {
	CREATE_ORDER_FAILED,
	CREATE_ORDER_LOADED,
	CREATE_ORDER_LOADING,
	RESET_ORDER_DETAILS,
} from "../constants/order-details";
import {TIngredient} from "../../types/data";
import {AppDispatch, AppThunk} from "../types";

export interface ICreateOrderLoadingAction {
	readonly type: typeof CREATE_ORDER_LOADING;
}

export interface ICreateOrderLoadedAction {
	readonly type: typeof CREATE_ORDER_LOADED;
	readonly number: number;
}

export interface ICreateOrderFailedAction {
	readonly type: typeof CREATE_ORDER_FAILED;
}

export interface IResetOrderDetailsAction {
	readonly type: typeof RESET_ORDER_DETAILS;
}

export type TCreateOrderActions =
	| ICreateOrderLoadingAction
	| ICreateOrderLoadedAction
	| ICreateOrderFailedAction
	| IResetOrderDetailsAction

export const createOrderLoading = (): ICreateOrderLoadingAction => ({
	type: CREATE_ORDER_LOADING,
});

export const createOrderLoaded = (number: number): ICreateOrderLoadedAction => ({
	type: CREATE_ORDER_LOADED,
	number
});

export const createOrderFailed = (): ICreateOrderFailedAction => ({
	type: CREATE_ORDER_FAILED,
});

export const resetOrderDetails = (): IResetOrderDetailsAction => ({
	type: RESET_ORDER_DETAILS,
});

export const createOrder: AppThunk = (orderDetails: Array<TIngredient>) => (dispatch: AppDispatch) => {
	const idArray = orderDetails.map((ingredient) => ingredient._id);
	dispatch(createOrderLoading());
	api
		.sendNewOrderRequest(idArray, cookie.get('accessToken'))
		.then((res) => {
			if (res.success) {
				dispatch(createOrderLoaded(res.order.number));
			}
		})
		.catch((err) => {
			dispatch(createOrderFailed());
			console.log(err);
		});
};
