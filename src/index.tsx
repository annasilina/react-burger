import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/app/app";
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from "./services/reducers";

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
    <App />
	</Provider>,
  document.getElementById('root')
);

reportWebVitals();
