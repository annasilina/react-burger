import React, {useState} from 'react';
import {useEffect} from 'react';
import styles from './app.module.css';

import {apiConfig, constructorData} from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Api from '../api/api';

const api = new Api(apiConfig);

function App() {
	const [ingredients, setIngredients] = useState([]);
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(true);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);

	useEffect(() => {
		api.getIngredients()
			.then((ingredientsData) => {
				setIngredients(ingredientsData.data);
			})
			.catch(err => console.log(err))
	}, []);

	const closeAllModals = () => {
		setIsOrderDetailsOpened(false);
		setIsIngredientDetailsOpened(false)
	};

	const handleEscKeydown = (event) => {
		event.key === "Escape" && closeAllModals();
	};

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor currentIngredients={constructorData}/>
			</main>
			{isOrderDetailsOpen &&
				<Modal title="" handleClose={closeAllModals} handleCloseEsc={handleEscKeydown}>
					<OrderDetails />
				</Modal>
			}
			{isIngredientDetailsOpen &&
				<Modal title="Детали игредиента" handleClose={closeAllModals} handleCloseEsc={handleEscKeydown}>
					<IngredientDetails ingredient={constructorData[0]}/>
				</Modal>
			}
		</>
	)
}

export default App;