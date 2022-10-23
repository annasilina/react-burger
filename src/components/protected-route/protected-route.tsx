import {Redirect, Route, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {cookie} from '../../cookie/cookie';
import {FC} from "react";

interface IProtectedRouteProps {
	notAuthReject: boolean;
	children: JSX.Element;
	path: string;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
	const {children, notAuthReject, ...rest} = props;
	const refreshToken = cookie.get('refreshToken');
	const location = useLocation();
	const state = location.state as { from: Location };
	const fromPage = state?.from?.pathname || links.home;

	if (!refreshToken && notAuthReject) {
		return (
			<Redirect to={{pathname: links.login, state: {from: location}}}/>
		);
	} else if (refreshToken && !notAuthReject) {
		return <Redirect to={fromPage}/>;
	} else {
		return <Route
			{...rest}
			render={() => children}
		/>
	}
};
