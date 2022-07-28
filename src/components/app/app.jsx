import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import styles from './app.module.css';

import {api} from '../../api/api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientsContext from '../../context/ingredients-context';


const App = () => {
	const [ingredients, setIngredients] = useState({
		isLoading: false,
		hasError: false,
		data: [],
	});

	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(false);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);
	const [ingredientId, setIngredientId] = useState();

	const orderId = Math.floor(Math.random() * 200000);
	console.log('tick App')

	useEffect(() => {
		setIngredients({
			...ingredients,
			isLoading: true,
		})
		api.getIngredients()
			.then(ingredientsData => {
				setIngredients({
					...ingredients,
					data: ingredientsData.data,
					isLoading: false,
				});
			})
			.catch((err) => {
				console.log(err);
				setIngredients({
					...ingredients,
					isLoading: false,
					hasError: true,
				})
			})
	}, []);

	const closeAllModals = useCallback(() => {
		setIsOrderDetailsOpened(false);
		setIsIngredientDetailsOpened(false)
	}, []);

	const handleEscKeydown = useCallback((event) => {
		event.key === "Escape" && closeAllModals();
	}, []);

	const handleOrderDetailsOpen = useCallback(() => {
		setIsOrderDetailsOpened(true);
	}, [])

	const handleIngredientDetailsOpen = useCallback((ingredientId) => {
		setIngredientId(ingredientId);
		setIsIngredientDetailsOpened(true);
	}, [])

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				{!ingredients.isLoading && !ingredients.hasError && ingredients.data.length &&
					<IngredientsContext.Provider value={{ingredients: ingredients.data}}>
						<BurgerIngredients setModalVisibility={handleIngredientDetailsOpen}/>
						<BurgerConstructor setModalVisibility={handleOrderDetailsOpen}/>
					</IngredientsContext.Provider>
				}
			</main>
			{isOrderDetailsOpen &&
				<Modal title="" handleClose={closeAllModals} handleCloseEsc={handleEscKeydown}>
					<OrderDetails orderId={orderId}/>
				</Modal>
			}
			{isIngredientDetailsOpen &&
				<Modal title="Детали ингредиента" handleClose={closeAllModals} handleCloseEsc={handleEscKeydown}>
					<IngredientDetails ingredient={ingredients.data.find(ingredient => ingredient._id === ingredientId)}/>
				</Modal>
			}
		</>
	)
}

export default App;