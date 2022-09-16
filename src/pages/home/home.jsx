import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import styles from './home.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients, RESET_SELECTED_INGREDIENTS} from '../../services/actions/burger-ingredients';
import {createOrder, RESET_ORDER_DETAILS} from '../../services/actions/order-details';
import {CONSTRUCTOR_RESET} from '../../services/actions/constructor';

const Home = () => {
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

	const dispatch = useDispatch();

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
			<DndProvider backend={HTML5Backend}>
				<main className={styles.main}>
					{ingredientsIsLoading && <span className="text text_type_main-large pt-10 pb-5">Загрузка...</span>}
					{ingredientsHasError && <span className="text text_type_main-large pt-10 pb-5">Упс, произошла ошибка. Пожалуйста, перезагрузите страницу.</span>}
					{!ingredientsIsLoading && !ingredientsHasError && ingredients.length &&
						<>
							<BurgerIngredients />
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
		</>
	)
}

export default Home;