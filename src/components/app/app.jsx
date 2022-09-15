import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';

const App = () => {

	return (
		<Router>
			<AppHeader/>
			<Switch>
				<Route path="/" exact={true}>
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/register">
					<RegisterPage />
				</Route>
				<Route path="/forgot-password">
					<ForgotPasswordPage />
				</Route>
				<Route path="/reset-password">
					<ResetPasswordPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;