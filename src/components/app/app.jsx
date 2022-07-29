import React, {useState} from 'react';
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
import {ModalContext} from '../../context/modal-context';

const App = () => {
	const [ingredients, setIngredients] = useState({
		isLoading: false,
		hasError: false,
		data: [],
	});
	const [orderDetails, setOrderDetails] = useState({
		isLoading: false,
		hasError: false,
		number: 0,
	});
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(false);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);
	const [ingredientId, setIngredientId] = useState();
	console.log('tick App');

	useEffect(() => {
		setIngredients({
			...ingredients,
			isLoading: true,
		})
		api.getIngredients()
			.then((ingredientsData) => {
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

	// const closeAllModals = useCallback(() => {
	// 	setIsOrderDetailsOpened(false);
	// 	setIsIngredientDetailsOpened(false)
	// }, [setIsIngredientDetailsOpened, setIsOrderDetailsOpened]);

	const handleOrderDetailsOpen = (IDs) => {
		setOrderDetails({
			...orderDetails,
			isLoading: true,
		})

		api.sendNewOrder(IDs)
			.then((res) => {
				setOrderDetails({
					...orderDetails,
					number: res.order.number,
					isLoading: false,
				})
				setIsOrderDetailsOpened(true);
			})
			.catch((err) => {
				setOrderDetails({
					...orderDetails,
					isLoading: false,
					hasError: true,
				})
				console.log(err);
			})
	};

	const handleIngredientDetailsOpen = (ingredientId) => {
		setIngredientId(ingredientId);
		setIsIngredientDetailsOpened(true);
	};

	return (
		<>
			<AppHeader/>
			<main className={styles.main}>
				{!ingredients.isLoading && !ingredients.hasError && ingredients.data.length &&
					<IngredientsContext.Provider value={{ingredients: ingredients.data}}>
						<BurgerIngredients setModalVisibility={handleIngredientDetailsOpen}/>
						<BurgerConstructor setModalVisibility={handleOrderDetailsOpen}/>
					</IngredientsContext.Provider>
				}
			</main>
			{isOrderDetailsOpen && !orderDetails.isLoading && !orderDetails.hasError &&
				<ModalContext.Provider value={{setIsIngredientDetailsOpened, setIsOrderDetailsOpened}}>
					<Modal title="">
						<OrderDetails orderId={orderDetails.number}/>
					</Modal>
				</ModalContext.Provider>
			}
			{isIngredientDetailsOpen &&
				<ModalContext.Provider value={{setIsIngredientDetailsOpened, setIsOrderDetailsOpened}}>
					<Modal title="Детали ингредиента">
						<IngredientDetails ingredient={ingredients.data.find(ingredient => ingredient._id === ingredientId)}/>
					</Modal>
				</ModalContext.Provider>
			}
		</>
	);
}

export default App;