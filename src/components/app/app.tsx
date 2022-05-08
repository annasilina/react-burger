import React from 'react';
import appStyles from './app.module.css';

import {hardData} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App() {
	return (
		<>
			<AppHeader />
			<main className={appStyles.page}>
				<h1 className="text text_type_main-large pb-5">
					Соберите бургер
				</h1>
				<section className={appStyles.burgerMenu}>
					<BurgerIngredients />
					<BurgerConstructor />
				</section>
			</main>
		</>
	)
}

export default App;