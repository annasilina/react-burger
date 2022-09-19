import {useDispatch} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {links} from '../../utils/constants';
import {updateToken} from '../../services/actions/auth';
import {getCookie} from '../../utils/cookie';
import {useEffect} from 'react';

export const ProtectedRoute = ({children, ...rest}) => {
	const accessToken = getCookie('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	const dispatch = useDispatch();

	useEffect(() => {
		if (!accessToken && refreshToken) {
			dispatch(updateToken(refreshToken));
		}
	})

	return (
		<Route
			{...rest}
			render={({location}) =>
				accessToken ? (
					children
				) : (
					<Redirect
						to={{
							pathname: links.login,
							state: {from: location}
						}}
					/>
				)
			}
		/>
	)
}