import {useSelector} from 'react-redux';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {getCookie} from '../../utils/cookies';

export const ProtectedRoute = ({children, ...rest}) => {
	const authData  = useSelector(state => state.authData);
	const location = useLocation();
	const cookie = getCookie('accessToken') !== undefined;

	return (
		<Route
			{...rest}
			exact={true}
			render={() => (cookie ? children : <Redirect to={{pathname: '/login', state: {from: location}}} />)}
		/>
	)
}