import React, {useCallback, useEffect, useRef, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';

import {resetSelectedIngredients} from '../../services/actions/burger-ingredients';
import {createOrder, resetOrderDetails,} from '../../services/actions/order-details';

import styles from './home.module.css';
import Preloader from '../../components/preloader/preloader';
import {useTDispatch, useTSelector} from '../../services/hooks';
import {resetConstructor} from '../../services/actions/constructor';
import {getAllIngredientsInOrder} from '../../ingredients/getAllIngredientsInOrder';

const Home = () => {
	const dispatch = useTDispatch();
	const [isOrderDetailsOpen, setIsOrderDetailsOpened] = useState(false);
	const [toggleOrderVisibility, setToggleOrderVisibility] = useState(false);
	const isInitialMount = useRef(true);

	const {ingredients, ingredientsIsLoading, ingredientsHasError} =
		useTSelector((state) => ({
			ingredients: state.ingredientsData.ingredients,
			ingredientsIsLoading: state.ingredientsData.ingredientsIsLoading,
			ingredientsHasError: state.ingredientsData.ingredientsHasError,
		}));

	const constructorData = useTSelector((state) => state.constructorData)

	const {orderNumber, orderIsLoading, orderHasError} =
		useTSelector((store) => ({
			orderNumber: store.orderData.orderNumber,
			orderIsLoading: store.orderData.orderIsLoading,
			orderHasError: store.orderData.orderHasError,
		})
	);

	useEffect(() => {
		  return () => {
		    isInitialMount.current = true;
		  };
		}, []);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			dispatch(createOrder(getAllIngredientsInOrder(constructorData.bunSelected, constructorData.ingredientsSelected)));
			setIsOrderDetailsOpened(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleOrderVisibility]);

	// const handleOrderDetailsOpen = useCallback(
	// (orderDetails) => {
	// 	setIsOrderDetailsOpened(true);
	// 	dispatch(createOrder(orderDetails));
	// },
	// [dispatch]
	// );

	const handleCloseOrderModal = useCallback(() => {
		if (!orderIsLoading) {
			setIsOrderDetailsOpened(false);
			dispatch(resetOrderDetails());
			dispatch(resetConstructor());
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
							<BurgerConstructor
								toggleOrderVisibility={toggleOrderVisibility}
								setToggleOrderVisibility={setToggleOrderVisibility}/>
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
