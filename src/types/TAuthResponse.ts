import {TUserData} from "./TUserData";

export type TAuthResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: TUserData;
}