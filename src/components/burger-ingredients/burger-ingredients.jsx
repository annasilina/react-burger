import React, {useCallback, useRef, useState} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import {useTSelector} from '../../services/hooks';

const BurgerIngredients = () => {
	// const ingredients = useSelector((state) => state.ingredientsData.ingredients);
	const ingredients = useTSelector((state) => state.ingredientsData.ingredients);

	const [current, setCurrent] = useState('bun');
	const bunListRef = useRef(null);
	const sauceListRef = useRef(null);

	const ingredientFilter = (ingredients, type) => {
		return ingredients.filter((ingredient) => ingredient.type === type);
	};

	const onTabClick = (tab) => {
		setCurrent(tab);
		document.getElementById(tab).scrollIntoView({behavior: 'smooth'});
	};

	const handleContainerScroll = useCallback(() => {
		const bunScrollTop = bunListRef.current.getBoundingClientRect().top;
		const bunHeight = bunListRef.current.clientHeight;
		const sauceScrollTop = sauceListRef.current.getBoundingClientRect().top;

		if (bunScrollTop > bunHeight / 2) {
			setCurrent('bun');
		} else if (sauceScrollTop < -50) {
			setCurrent('main');
		} else {
			setCurrent('sauce');
		}
	}, []);

	return (
		<section>
			<h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
			<div className={`${styles.tabs} mb-10`}>
				<Tab value='bun' active={current === 'bun'} onClick={onTabClick}>
					Булки
				</Tab>
				<Tab value='sauce' active={current === 'sauce'} onClick={onTabClick}>
					Соусы
				</Tab>
				<Tab value='main' active={current === 'main'} onClick={onTabClick}>
					Начинки
				</Tab>
			</div>
			<div className={styles.container} onScroll={handleContainerScroll}>
				<IngredientsCategory
					type='bun'
					title='Булки'
					ref={bunListRef}
					ingredients={ingredientFilter(ingredients, 'bun')}
				/>
				<IngredientsCategory
					type='sauce'
					title='Соусы'
					ref={sauceListRef}
					ingredients={ingredientFilter(ingredients, 'sauce')}
				/>
				<IngredientsCategory
					type='main'
					title='Начинки'
					ingredients={ingredientFilter(ingredients, 'main')}
				/>
			</div>
		</section>
	);
};

export default BurgerIngredients;
