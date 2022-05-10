import React from 'react';
import styles from './app.module.css';

import {data, randomIngredients} from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={data} />
				<BurgerConstructor currentIngredients={randomIngredients}/>
			</main>
		</>
	)
}

export default App;