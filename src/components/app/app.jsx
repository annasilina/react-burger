import React, {useState} from 'react';
import {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/actions/burger-details';
import {createOrder} from '../../services/actions/order-details';

const App = () => {
	const { ingredients, ingredientsIsLoading, ingredientsHasError } = useSelector((state) => ({
		ingredients: state.burger.ingredients,
		ingredientsIsLoading: state.burger.ingredientsIsLoading,
		ingredientsHasError: state.burger.ingredientsHasError,
	}));

	const { orderNumber, orderIsLoading, orderHasError } = useSelector((state) => ({
		orderNumber: state.order.orderNumber,
		orderIsLoading: state.order.orderIsLoading,
		orderHasError: state.order.orderHasError
	}));

	const dispatch = useDispatch();

	const [isIngredientDetailsOpen, setIsIngredientDetailsOpened] = useState(false);
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);
	const [ingredientId, setIngredientId] = useState();
	console.log('tick App');

	useEffect(
		() => {
			dispatch(getIngredients());
		},
		[dispatch]
	);

	const handleOrderDetailsOpen = (IDs) => {
		dispatch(createOrder(IDs))
		setIsOrderDetailsOpened(true);
	};

	const handleIngredientDetailsOpen = (ingredientId) => {
		setIngredientId(ingredientId);
		setIsIngredientDetailsOpened(true);
	};

	const closeAllModals = () => {
		setIsOrderDetailsOpened(false)
		setIsIngredientDetailsOpened(false)
	};


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
				<Modal title="" handleClose={closeAllModals}>
					<OrderDetails orderId={orderNumber}/>
				</Modal>
			}
			{isIngredientDetailsOpen &&
				<Modal title="Детали ингредиента" handleClose={closeAllModals}>
					<IngredientDetails ingredient={ingredients.find(ingredient => ingredient._id === ingredientId)}/>
				</Modal>
			}
		</>
	);
}

export default App;