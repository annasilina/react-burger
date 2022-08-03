import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients, RESET_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS} from '../../services/actions/burger-details';
import {createOrder, RESET_ORDER_DETAILS} from '../../services/actions/order-details';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const App = () => {
	const { ingredients, ingredientsIsLoading, ingredientsHasError, ingredientDetails } = useSelector((state) => ({
		ingredients: state.burger.ingredients,
		ingredientsIsLoading: state.burger.ingredientsIsLoading,
		ingredientsHasError: state.burger.ingredientsHasError,
		ingredientDetails: state.burger.ingredientDetails
	}));

	const { orderNumber, orderIsLoading, orderHasError } = useSelector((state) => ({
		orderNumber: state.order.orderNumber,
		orderIsLoading: state.order.orderIsLoading,
		orderHasError: state.order.orderHasError
	}));

	const dispatch = useDispatch();

	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(false);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);

	console.log('tick App');

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
			ingredient: ingredient
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
		setIsOrderDetailsOpened(false)
		dispatch({
			type: RESET_ORDER_DETAILS
		})
	}, [dispatch]);

	return (
		<>
			<AppHeader/>
				<main className={styles.main}>
					{!ingredientsIsLoading && !ingredientsHasError && ingredients.length &&
						<>
							<BurgerIngredients setModalVisibility={handleIngredientDetailsOpen}/>
							<BurgerConstructor setModalVisibility={handleOrderDetailsOpen}/>
						</>
					}
				</main>
			{isOrderDetailsOpen && !orderIsLoading && !orderHasError &&
				<Modal title="" handleClose={handleCloseOrderModal}>
					<OrderDetails orderID={orderNumber}/>
				</Modal>
			}
			{isIngredientDetailsOpen &&
				<Modal title="Детали ингредиента" handleClose={handleCloseIngredientModal}>
					<IngredientDetails ingredient={ingredientDetails}/>
				</Modal>
			}
		</>
	);
}

export default App;