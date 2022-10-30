import React, {FC, useEffect} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {useTDispatch, useTSelector} from '../../services/hooks';

import {getIngredients} from '../../services/actions/burger-ingredients';
import {links} from '../../utils/constants';
import {ProtectedRoute} from '../protected-route/protected-route';
import {getUser} from '../../services/actions/auth';
import {cookie} from '../../cookie/cookie';

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
import Preloader from '../preloader/preloader';
import FeedPage from '../../pages/feed/feed';
import FeedDetailsPage from '../../pages/feed-details/feed-details';
import OrderFullInfo from '../order-full-info/order-full-info';
import {TLocation} from "../../types/TLocation";

const App: FC = () => {
// function App(): JSX.Element {
	const dispatch = useTDispatch();
	const history = useHistory();
	// const location = useLocation<{background: Location}>();
	const location = useLocation<TLocation>();

	const refreshToken = cookie.get('refreshToken');

	const authData = useTSelector(state => state.authData);
	const dataAll = useTSelector(state => state.wsData);
	const dataAuth = useTSelector(state => state.wsAuthData);
	const ingredientsData = useTSelector(state => state.ingredientsData);

	useEffect(() => {
		dispatch(getIngredients());
		history.replace({state: null});

		if (refreshToken) {
			dispatch(getUser());
		}
	}, [dispatch]);

	const handleClose = () => {
		history.goBack();
	};

	const background = location.state && location.state?.background;

	return {
		...(authData.isUserLoading ? (
			<Preloader type='loader'/>
		) : (
			<>
				<AppHeader/>
				<Switch location={background || location}>
					<Route path={links.home} exact={true}>
						<Home/>
					</Route>
					<ProtectedRoute path={links.profileOrderInfo} notAuthReject={true} >
						<FeedDetailsPage wsAuth={true}/>
					</ProtectedRoute>
					<ProtectedRoute path={links.profile} notAuthReject={true}>
						<Profile/>
					</ProtectedRoute>
					<ProtectedRoute path={links.login} notAuthReject={false}>
						<Login/>
					</ProtectedRoute>
					<ProtectedRoute path={links.register} notAuthReject={false}>
						<RegisterPage/>
					</ProtectedRoute>
					<ProtectedRoute path={links.forgotPassword} notAuthReject={false}>
						<ForgotPasswordPage/>
					</ProtectedRoute>
					<ProtectedRoute path={links.resetPassword} notAuthReject={false}>
						<ResetPasswordPage/>
					</ProtectedRoute>
					<Route path={links.ingredient}>
						<IngredientsPage/>
					</Route>
					<Route path={links.feedOrders} exact>
						<FeedPage />
					</Route>
					<Route path={links.feedOrderInfo}>
						<FeedDetailsPage wsAuth={false}/>
					</Route>
					<Route>
						<Page404/>
					</Route>
				</Switch>
				{background && (
					<>
						{!ingredientsData.ingredients.length ? (
							<div></div>
						) : (
							<Route path={links.ingredient}>
								<Modal title='Детали ингредиента' handleClose={handleClose}>
									<IngredientDetails/>
								</Modal>
							</Route>
						)}
						{!dataAll.orders.length ? (
							<div></div>
						) : (
						<Route path={links.feedOrderInfo}>
							<Modal title='' handleClose={handleClose}>
								<OrderFullInfo wsAuth={false}/>
							</Modal>
						</Route>
						)}
						{!dataAuth.orders.length ? (
							<div></div>
						) : (
							<Route path={links.profileOrderInfo}>
							<Modal title='' handleClose={handleClose}>
								<OrderFullInfo wsAuth={true}/>
							</Modal>
						</Route>
						)}
					</>
				)}
			</>
		)),
	};
};

export default App;
