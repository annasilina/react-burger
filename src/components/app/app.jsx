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
import {getUser} from '../../services/actions/auth';
import {getCookie} from '../../utils/cookie';
import Preloader from '../preloader/preloader';
import FeedPage from '../../pages/feed/feed';
import FeedDetailsPage from '../../pages/feed-details/feed-details';
import OrderFullInfo from '../order-full-info/order-full-info';

const App = () => {
	const refreshToken = getCookie('refreshToken');
	const authData = useSelector((state) => state.authData);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const background = location.state?.background;

	useEffect(() => {
		dispatch(getIngredients());
		history.replace({state: null});

		if (refreshToken) {
			dispatch(getUser());
		}
	}, []);

	const handleClose = () => {
		history.goBack();
	};

	return {
		...(authData.isUserLoading ? (
			<Preloader/>
		) : (
			<>
				<AppHeader/>
				<Switch location={background || location}>
					<Route path={links.home} exact={true}>
						<Home/>
					</Route>
					<ProtectedRoute path='/profile/orders/:id' anonymReject={true} >
						<FeedDetailsPage wsAuth={true}/>
					</ProtectedRoute>
					<ProtectedRoute path={links.profile} anonymReject={true}>
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
					<Route path={links.ingredient}>
						<IngredientsPage/>
					</Route>
					<Route path={links.feedOrders} exact>
						<FeedPage />
					</Route>
					<Route path={links.feedOrderInfo} exact>
						<FeedDetailsPage wsAuth={false}/>
					</Route>
					<Route>
						<Page404/>
					</Route>
				</Switch>
				{background && (
					<>
						<Route path={links.ingredient}>
							<Modal title='Детали ингредиента' handleClose={handleClose}>
								<IngredientDetails/>
							</Modal>
						</Route>
						<Route path={links.feedOrderInfo}>
							<Modal title='' handleClose={handleClose}>
								<OrderFullInfo/>
							</Modal>
						</Route>
						<Route path={links.profileOrderInfo}>
							<Modal title='' handleClose={handleClose}>
								<OrderFullInfo/>
							</Modal>
						</Route>
					</>
				)}
			</>
		)),
	};
};

export default App;
