import {Redirect, Route} from 'react-router-dom';
import {links} from '../../utils/constants';

export const ProtectedRoute = ({children, ...rest}) => {
	const refreshToken = localStorage.getItem('refreshToken');
	/*const authData = useSelector(state => state.authData);*/

	return (
		<Route
			{...rest}
			render={({location}) =>
				refreshToken ? (
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