import React, {FC, useMemo} from 'react';

import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorContainer} from '../constructor-container/constructor-container';
import {links} from '../../utils/constants';
import {useHistory, useLocation} from 'react-router-dom';
import {cookie} from '../../cookie/cookie';
import {useTSelector} from '../../services/hooks';
import {getAllIngredientsInOrder} from '../../ingredients/getAllIngredientsInOrder';
import {calcOrderCost} from '../../order/calcOrderCost';

interface IBurgerConstructorProps {
	toggleOrderVisibility: boolean;
	setToggleOrderVisibility: (toggleOrderVisibility: boolean) => void;
}

const BurgerConstructor: FC<IBurgerConstructorProps> = React.memo(({toggleOrderVisibility, setToggleOrderVisibility}) => {
	const refreshToken = cookie.get('refreshToken');
	const location = useLocation();
	const history = useHistory();
	const orderIsLoading = useTSelector((state) => state.orderData.orderIsLoading);
	const bunSelected = useTSelector((state) => state.constructorData.bunSelected);
	const ingredientsSelected = useTSelector(
		(state) => state.constructorData.ingredientsSelected
	);

	const orderCost = useMemo(() => {
		return bunSelected
			? calcOrderCost(getAllIngredientsInOrder(bunSelected, ingredientsSelected))
			: calcOrderCost(ingredientsSelected);
	}, [bunSelected, ingredientsSelected]);

	const handleButtonClick = () => {
		if (refreshToken) {
			setToggleOrderVisibility(!toggleOrderVisibility)
		} else {
			history.replace({
				pathname: links.login,
				state: {from: location},
			});
		}
	};

	return (
		<section className={`mt-25`}>
			<ConstructorContainer />
			<div className={`${styles.order} mt-10 mr-4`}>
				<div className={`${styles.orderCost} mr-10`}>
					<p className='text text_type_digits-medium mr-2'>
						{orderCost ? orderCost : 0}
					</p>
					<CurrencyIcon type='primary'/>
				</div>
				{/* @ts-ignore */}
				<Button
					type='primary'
					size='large'
					onClick={handleButtonClick}
					{...(bunSelected && ingredientsSelected.length && !orderIsLoading
						? {disabled: false}
						: {disabled: true})}
				>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
});


export default BurgerConstructor;
