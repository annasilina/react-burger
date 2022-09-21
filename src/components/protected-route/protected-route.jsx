import {Redirect, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {getCookie} from '../../utils/cookie';

export const ProtectedRoute = ({children, anonymReject}) => {
	/*const refreshToken = localStorage.getItem('refreshToken');*/
	const refreshToken = getCookie('refreshToken');
	const location = useLocation();
	const fromPage = location.state?.from || links.home;

	if (!refreshToken && anonymReject) {
		return (
			<Redirect to={{ pathname: links.login, state: {from: location}}} />
		)
	}

	if (refreshToken && !anonymReject) {
		return (
			<Redirect to={fromPage} />
		)
	}

	return children;

	/*return (
		<Route
			{...rest}
			render={({location}) =>
				refreshToken ? (children)
					: (<Redirect to={{
							pathname: links.login,
							state: {from: location}}}/>)}
		/>
	)*/
}