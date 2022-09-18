import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {links} from '../../utils/constants';

export const ProtectedRoute = ({children, ...rest}) => {
	const authData = useSelector(state => state.authData);

	return (
		<Route
			{...rest}
			render={({location}) =>
				authData.isAuth ? (
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