import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import './index.css';
import App from "./components/app/app";
import {rootReducer} from "./services/reducers";

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

ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
  document.getElementById('root')
);

reportWebVitals();
