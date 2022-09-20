import React from 'react';
/*import ReactDOM from 'react-dom';*/
import {createRoot} from "react-dom/client";
/*import reportWebVitals from './reportWebVitals';*/
import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import App from "./components/app/app";
import './index.css';
import {rootReducer} from "./services/reducers";

// @ts-ignore
import {BrowserRouter as Router} from "react-router-dom";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
);

/*
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);
const rootElement = document.getElementById('root');

createRoot(rootElement!).render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
)

reportWebVitals();
*/
