import React, {useState} from 'react';
import {useEffect} from 'react';
import styles from './app.module.css';

import {apiConfig, constructorData} from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from '../api/api';

const api = new Api(apiConfig);

function App() {
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		api.getIngredients()
			.then((data) => {
				setIngredients(data.data);
			})
			.catch(err => console.log(err))
	}, []);

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor currentIngredients={constructorData}/>
			</main>
		</>
	)
}

export default App;