import {TIngredient, TUserData} from "../types/data";

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

export type TApiBaseResponse = {
	success: boolean;
	message?: string;
}
export type TApiUserDataResponse = TApiBaseResponse & TUserData;

export type TApiUserDataWithTokensResponse = {
	accessToken: string;
	refreshToken: string;
} & TApiBaseResponse & TUserData;

export type TApiIngredientsDataResponse = {
	data: Array<TIngredient>;
} & TApiBaseResponse