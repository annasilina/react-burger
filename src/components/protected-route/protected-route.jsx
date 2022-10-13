import {Redirect, Route, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {getCookie} from '../../utils/cookie';

export const ProtectedRoute = ({children, anonymReject, ...rest}) => {
	const refreshToken = getCookie('refreshToken');
	const location = useLocation();
	const fromPage = location.state?.from?.pathname || links.home;

	if (!refreshToken && anonymReject) {
		return (
			<Redirect to={{pathname: links.login, state: {from: location}}}/>
		);
	} else if (refreshToken && !anonymReject) {
		return <Redirect to={fromPage}/>;
	} else {
		return <Route
			{...rest}
			render={(location) => children}
		/>
	}
};