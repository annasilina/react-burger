import {TCookieProps} from "../types/TCookieProps";
import {TApiUserDataWithTokensResponse} from "../api/types";

class Cookie {
	public get = (cookieName: string): string | undefined => {
		const matches = document.cookie.match(
			new RegExp(
				`(?:^|; )${cookieName.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
			)
		);
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};

	public set = (cookieName: string, cookieValue: string, cookieProps?: TCookieProps): void => {
		cookieProps = cookieProps || {};
		cookieValue = encodeURIComponent(cookieValue);

		let updatedCookie = `${cookieName}=${cookieValue}`;
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

	public delete = (cookieName: string): void => {
		this.set(cookieName, '', {expires: -1, path: '/'});
	};

	public setTokens = (authData: TApiUserDataWithTokensResponse) :void => {
		const accessToken = authData.accessToken.split('Bearer ')[1];
		const refreshToken = authData.refreshToken;

		this.set('refreshToken', refreshToken, {path: '/'});
		this.set('accessToken', accessToken, {expires: 600, path: '/'});
	};
}

export const cookie = new Cookie();