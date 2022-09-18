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
import {useDispatch} from 'react-redux';
import {getIngredients} from '../../services/actions/burger-ingredients';
import {links} from '../../utils/constants';

const App = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const background = location.state?.background;

	useEffect(() => {
		dispatch(getIngredients());
		history.replace({ state: null })
	}, [dispatch, history]);

	const handleClose = () => {
		history.goBack();
	}

	return (
		<>
			<AppHeader/>
				<Switch location={background || location}>
					<Route path={links.home} exact={true}>
						<Home />
					</Route>
					<Route path={links.login}>
						<Login />
					</Route>
					<Route path={links.profile} exact={true}>
						<Profile />
					</Route>
					<Route path={links.register}>
						<RegisterPage />
					</Route>
					<Route path={links.forgotPassword}>
						<ForgotPasswordPage />
					</Route>
					<Route path={links.resetPassword}>
						<ResetPasswordPage />
					</Route>
					<Route path={`${links.ingredients}/:id`}>
						<IngredientsPage />
					</Route>
					<Route>
						<Page404 />
					</Route>
				</Switch>
				{background &&
					<Route path={`${links.ingredients}/:id`}>
						<Modal title='Детали ингредиента' handleClose={handleClose}>
							<IngredientDetails />
						</Modal>
					</Route>
				}
		</>
	);
}

export default App;