import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';

import {resetSelectedIngredients} from '../../services/actions/burger-ingredients';
import {createOrder, RESET_ORDER_DETAILS,} from '../../services/actions/order-details';
import {CONSTRUCTOR_RESET} from '../../services/actions/constructor';

import styles from './home.module.css';
import Preloader from '../../components/preloader/preloader';
import {useTDispatch, useTSelector} from '../../services/hooks';

const Home = () => {
	const dispatch = useTDispatch();
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);

	// const {ingredients, ingredientsIsLoading, ingredientsHasError} =
	// 	useSelector((state) => ({
	// 		ingredients: state.ingredientsData.ingredients,
	// 		ingredientsIsLoading: state.ingredientsData.ingredientsIsLoading,
	// 		ingredientsHasError: state.ingredientsData.ingredientsHasError,
	// 	}));

	const {ingredients, ingredientsIsLoading, ingredientsHasError} =
		useTSelector((store) => ({
			ingredients: store.ingredientsData.ingredients,
			ingredientsIsLoading: store.ingredientsData.ingredientsIsLoading,
			ingredientsHasError: store.ingredientsData.ingredientsHasError,
		}));

	const {orderNumber, orderIsLoading, orderHasError} = useSelector(
		(state) => ({
			orderNumber: state.orderData.orderNumber,
			orderIsLoading: state.orderData.orderIsLoading,
			orderHasError: state.orderData.orderHasError,
		})
	);

	const handleOrderDetailsOpen = useCallback(
		(orderDetails) => {
			setIsOrderDetailsOpened(true);
			dispatch(createOrder(orderDetails));
		},
		[dispatch]
	);

	const handleCloseOrderModal = useCallback(() => {
		if (!orderIsLoading) {
			setIsOrderDetailsOpened(false);
			dispatch({
				type: RESET_ORDER_DETAILS,
			});
			dispatch({
				type: CONSTRUCTOR_RESET,
			});
			dispatch(resetSelectedIngredients());
		}
	}, [orderIsLoading, dispatch]);

	return ingredientsIsLoading ? (
		<Preloader type='loader'/>
		) : (
		<>
			<DndProvider backend={HTML5Backend}>
				<main className={styles.main}>
					{/*{ingredientsIsLoading && (<Preloader type='loader'/>)}*/}
					{ingredientsHasError && (
						<span className='text text_type_main-large pt-10 pb-5'>
              Упс, произошла ошибка. Пожалуйста, перезагрузите страницу.
            </span>
					)}
					{!ingredientsIsLoading && !ingredientsHasError && ingredients.length && (
						<>
							<BurgerIngredients/>
							<BurgerConstructor setModalVisibility={handleOrderDetailsOpen}/>
						</>
					)}
				</main>
			</DndProvider>
			{isOrderDetailsOpen && !orderHasError && (
				<Modal
					title=''
					handleClose={handleCloseOrderModal}
					{...(orderIsLoading
						? {children: <Preloader type='loader'/>, title: 'Загружаем заказ...'}
						: {
							children: <OrderDetails orderID={orderNumber}/>,
						})}
				/>
			)}
		</>
	);
};

export default Home;
