import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import App from "./components/app/app";
import "./index.css";
import {store} from "./services/store";

// @ts-ignore
import { HashRouter, BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);
const Router = process.env.PUBLIC_URL ? HashRouter : BrowserRouter;

root.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
);