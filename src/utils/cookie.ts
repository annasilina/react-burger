import {TCookieProps} from "../types/TCookieProps";

export const getCookie = (cookieName: string): string | undefined => {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
			cookieName.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
			'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (cookieName: string, cookieValue: string, cookieProps?: TCookieProps): void => {
	cookieProps = cookieProps || {};
	cookieValue = encodeURIComponent(cookieValue);

	let updatedCookie = cookieName + '=' + cookieValue;
	let exp = cookieProps.expires;

	if (exp && typeof exp == 'number') {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = d;
	}
	if (exp && exp instanceof Date) {
		updatedCookie += `;expires=${exp.toUTCString()}`;
	}
	if (cookieProps.path) {
		updatedCookie += `;path=${cookieProps.path}`;
	}
	document.cookie = updatedCookie;
};

export const deleteCookie = (cookieName: string): void => {
	setCookie(cookieName, '', {expires: -1, path: '/'});
};

