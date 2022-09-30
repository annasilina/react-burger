import {setCookie} from './cookie';

export const setTokenData = (
	data: {
		success: boolean,
		accessToken: string,
		refreshToken: string,
	}) :void => {
	const accessToken: string = data.accessToken.split('Bearer ')[1];
	const refreshToken: string = data.refreshToken;

	setCookie('refreshToken', refreshToken, {path: '/'});
	setCookie('accessToken', accessToken, {expires: 600, path: '/'});
};
