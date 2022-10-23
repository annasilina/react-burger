import React, {FC} from 'react';
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';
import {useDrag} from 'react-dnd';
import {Link, useLocation} from 'react-router-dom';
import {TIngredient} from "../../types/data";

interface IBurgerIngredientProps {
	ingredient: TIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = React.memo(({ingredient}) => {
	const location = useLocation();

	const [{isDragging}, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<li
			ref={dragRef}
			key={ingredient._id}
			style={{cursor: isDragging ? 'grabbing' : 'grab'}}
			className={`${styles.item}`}
		>
			<Link
				to={{
					pathname: `/ingredients/${ingredient._id}`,
					state: {background: location},
				}}
				className={styles.link}
			>
				<img
					src={ingredient.image}
					alt={ingredient.name}
					className='pr-4 pl-4'
				/>
				{ingredient.count > 0 && (
					<Counter count={ingredient.count} size='default'/>
				)}
				<div className={`${styles.itemCurrency} mb-1 mt-1`}>
					<p className='text text_type_digits-default mr-2'>
						{ingredient.price}
					</p>
					<CurrencyIcon type='primary'/>
				</div>
				<p className={`${styles.itemCaption} text text_type_main-default pt-1`}>
					{ingredient.name}
				</p>
			</Link>
		</li>
	);
});

export default BurgerIngredient;
