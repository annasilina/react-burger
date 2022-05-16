import React, {useState} from 'react';
import {useEffect} from 'react';
import styles from './app.module.css';

import {constructorData} from '../../utils/data';
import {api} from '../../api/api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {
	const [ingredients, setIngredients] = useState([]);
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(false);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);
	const [ingredientId, setIngredientId] = useState();

	const orderId = Math.floor(Math.random() * 200000);

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
				<BurgerIngredients ingredients={ingredients} setIngredientId={setIngredientId} setModalVisibility={setIsIngredientDetailsOpened}/>
				<BurgerConstructor currentIngredients={constructorData} setModalVisibility={setIsOrderDetailsOpened}/>
			</main>
			{isOrderDetailsOpen &&
				<Modal title="" handleClose={closeAllModals} handleCloseEsc={handleEscKeydown}>
					<OrderDetails orderId={orderId}/>
				</Modal>
			}
			{isIngredientDetailsOpen &&
				<Modal title="Детали ингредиента" handleClose={closeAllModals} handleCloseEsc={handleEscKeydown}>
					<IngredientDetails ingredient={ingredients.find(ingredient => ingredient._id === ingredientId)}/>
				</Modal>
			}
		</>
	)
}

export default App;