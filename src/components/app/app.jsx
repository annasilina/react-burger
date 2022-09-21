import React, {useEffect} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import Page404 from '../../pages/page-404/page-404';
import IngredientsPage from '../../pages/ingredients/ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/actions/burger-ingredients';
import {links} from '../../utils/constants';
import {ProtectedRoute} from '../protected-route/protected-route';
import {getUser, updateToken} from '../../services/actions/auth';
import {getCookie} from '../../utils/cookie';
import Preloader from '../preloader/preloader';

const App = () => {
	const accessToken = getCookie('accessToken');
	/*const refreshToken = localStorage.getItem('refreshToken');*/
	const refreshToken = getCookie('refreshToken');
	const authData = useSelector(state => state.authData);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const background = location.state?.background;

	useEffect(() => {
		dispatch(getIngredients());
		history.replace({state: null})

		if (!accessToken && refreshToken) {
			dispatch(updateToken(refreshToken))
				.then(() => dispatch(getUser()));
		} else if (accessToken) {
			dispatch(getUser());
		}

	}, [dispatch, history]);

	const handleClose = () => {
		history.goBack();
	}

	return (
		{
			...authData.isUserLoading
				? <Preloader/> :
				<>
					<AppHeader/>
					<Switch location={background || location}>
						<Route path={links.home}
									 exact={true}>
							<Home/>
						</Route>
						<ProtectedRoute path={links.profile} anonymReject={true} exact>
							<Profile/>
						</ProtectedRoute>
						<ProtectedRoute path={links.login} anonymReject={false}>
							<Login/>
						</ProtectedRoute>
						<ProtectedRoute path={links.register} anonymReject={false}>
							<RegisterPage/>
						</ProtectedRoute>
						<ProtectedRoute path={links.forgotPassword} anonymReject={false}>
							<ForgotPasswordPage/>
						</ProtectedRoute>
						<ProtectedRoute path={links.resetPassword} anonymReject={false}>
							<ResetPasswordPage/>
						</ProtectedRoute>
						<Route path={`${links.ingredients}/:id`}>
							<IngredientsPage/>
						</Route>
						<Route>
							<Page404/>
						</Route>
					</Switch>
					{background &&
						<Route path={`${links.ingredients}/:id`}>
							<Modal title="Детали ингредиента"
										 handleClose={handleClose}>
								<IngredientDetails/>
							</Modal>
						</Route>
					}
				</>
		}
	);
}

export default App;