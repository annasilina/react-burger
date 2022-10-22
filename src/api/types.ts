import {TIngredient, TUserData} from "../types/data";
import {TBaseResponse} from "../types/TBaseResponse";

export interface IApicConfig {
	readonly baseURL: string;
	readonly headers: {
		[key: string]: string;
	}
}

export interface IInitData {
	readonly method: 'POST' | 'PATCH' | 'GET';
	readonly headers: {
		[key: string]: string;
	}
	readonly body?: string;
}

export type TApiUserDataResponse = TBaseResponse & TUserData;

export type TApiUserDataWithTokensResponse = {
	accessToken: string;
	refreshToken: string;
} & TBaseResponse & TUserData;

export type TApiIngredientsDataResponse = {
	data: Array<TIngredient>;
} & TBaseResponse

export type TApiCreateOrderResponse = {
	name: string;
	order: {
		number: number;
	}
} & TBaseResponse;