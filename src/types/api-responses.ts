import {TUserData} from "./TUserData";
import {TIngredient} from "./TIngredient";

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
