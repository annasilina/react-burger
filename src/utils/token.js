import {setCookie} from './cookie';

export const setTokenData = (data) => {
	const accessToken = data.accessToken.split('Bearer ')[1];
	const refreshToken = data.refreshToken;

	setCookie('refreshToken', refreshToken, {path: '/'});
	setCookie('accessToken', accessToken, {expires: 600, path: '/'});
};
