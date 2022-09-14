import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import {
	getIngredients,
	RESET_SELECTED_INGREDIENTS,
} from '../../services/actions/burger-ingredients';
import {createOrder, RESET_ORDER_DETAILS} from '../../services/actions/order-details';
import {RESET_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS} from '../../services/actions/ingredient-details';
import {CONSTRUCTOR_RESET} from '../../services/actions/constructor';
import Login from '../../pages/login/login';

const App = () => {
	const { ingredients, ingredientsIsLoading, ingredientsHasError } = useSelector((state) => ({
		ingredients: state.ingredientsData.ingredients,
		ingredientsIsLoading: state.ingredientsData.ingredientsIsLoading,
		ingredientsHasError: state.ingredientsData.ingredientsHasError,
	}));

	const { orderNumber, orderIsLoading, orderHasError } = useSelector((state) => ({
		orderNumber: state.orderData.orderNumber,
		orderIsLoading: state.orderData.orderIsLoading,
		orderHasError: state.orderData.orderHasError
	}));

	const ingredientDetails = useSelector(state => state.detailsData.ingredientDetails)

	const dispatch = useDispatch();

	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(false);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);

	useEffect(
		() => {
			dispatch(getIngredients());
		},
		[dispatch]
	);

	const handleOrderDetailsOpen = useCallback((orderDetails) => {
		dispatch(createOrder(orderDetails))
		setIsOrderDetailsOpened(true);
	}, [dispatch]);

	const handleIngredientDetailsOpen = useCallback((ingredient) => {
		dispatch({
			type: SET_INGREDIENT_DETAILS,
			payload: ingredient
		})
		setIsIngredientDetailsOpened(true)
	}, [dispatch]);

	const handleCloseIngredientModal = useCallback(() => {
		setIsIngredientDetailsOpened(false);
		dispatch({
			type: RESET_INGREDIENT_DETAILS
		})
	},[dispatch])

	const handleCloseOrderModal = useCallback(() => {
		setIsOrderDetailsOpened(false);
		dispatch({
			type: RESET_ORDER_DETAILS
		});
		dispatch({
			type: CONSTRUCTOR_RESET
		})
		dispatch({
			type: RESET_SELECTED_INGREDIENTS
		})
	}, [dispatch]);

	return (
		<>
			<AppHeader/>
			<Login />
			{/*<DndProvider backend={HTML5Backend}>
				<main className={styles.main}>
					{ingredientsIsLoading && <span className="text text_type_main-large pt-10 pb-5">Загрузка...</span>}
					{ingredientsHasError && <span className="text text_type_main-large pt-10 pb-5">Упс, произошла ошибка. Пожалуйста, перезагрузите страницу.</span>}
					{!ingredientsIsLoading && !ingredientsHasError && ingredients.length &&
						<>
							<BurgerIngredients setModalVisibility={handleIngredientDetailsOpen}/>
							<BurgerConstructor setModalVisibility={handleOrderDetailsOpen}/>
						</>
					}
				</main>
			</DndProvider>
			{isOrderDetailsOpen && !orderIsLoading && !orderHasError &&
				<Modal title="" handleClose={handleCloseOrderModal}>
					<OrderDetails orderID={orderNumber}/>
				</Modal>
			}
			{isIngredientDetailsOpen &&
				<Modal title="Детали ингредиента" handleClose={handleCloseIngredientModal}>
					<IngredientDetails ingredient={ingredientDetails}/>
				</Modal>
			}*/}
		</>
	);
}

export default App;