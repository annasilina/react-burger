import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';

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
					<Register />
				</Route>
				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>
				<Route path="/reset-password">
					<ResetPassword />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;