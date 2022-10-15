import {setCookie} from './cookie';

export const setTokenData = (
	// TODO: remove this when we have type for data types
	data: {
		success: boolean,
		accessToken: string,
		refreshToken: string,
	}) :void => {
	const accessToken = data.accessToken.split('Bearer ')[1];
	const refreshToken = data.refreshToken;

	setCookie('refreshToken', refreshToken, {path: '/'});
	setCookie('accessToken', accessToken, {expires: 600, path: '/'});
};
