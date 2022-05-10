import React from 'react';
import styles from './app.module.css';

import {data} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<section className={styles.burgerMenu}>
					<BurgerIngredients ingredients={data} />
				</section>
			</main>
		</>
	)
}

export default App;