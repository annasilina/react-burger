import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import App from "./components/app/app";
import "./index.css";
import {store} from "./services/store";

import {BrowserRouter, HashRouter} from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);
//const Router = process.env.PUBLIC_URL ? HashRouter : BrowserRouter;
//root.render(
// 	<Provider store={store}>
// 		<Router>
// 			<App/>
// 		</Router>
// 	</Provider>

root.render(
	<Provider store={store}>
		{process.env.PUBLIC_URL
			?
				<HashRouter basename={process.env.PUBLIC_URL} >
					<App/>
				</HashRouter>
			:
				<BrowserRouter>
					<App />
				</BrowserRouter>
		}
	</Provider>
);