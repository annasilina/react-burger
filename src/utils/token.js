import {setCookie} from './cookie';

export const setTokenData = (data) => {
	const accessToken = data.accessToken.split('Bearer ')[1];
	const refreshToken = data.refreshToken;

	setCookie('accessToken', accessToken, {expires: 1200, path: '/'})
	localStorage.setItem('refreshToken', refreshToken);
}