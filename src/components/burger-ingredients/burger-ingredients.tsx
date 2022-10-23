import React, {FC, useCallback, useRef, useState} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import {useTSelector} from '../../services/hooks';
import {TIngredient, TIngredientType} from "../../types/data";

const BurgerIngredients: FC = () => {
	const ingredients = useTSelector((state) => state.ingredientsData.ingredients);

	const [current, setCurrent] = useState<string>('bun');
	const bunListRef = useRef<HTMLDivElement>(null);
	const sauceListRef = useRef<HTMLDivElement>(null);

	const ingredientFilter = (ingredients: Array<TIngredient>, type: TIngredientType): Array<TIngredient> => {
		return ingredients.filter((ingredient) => ingredient.type === type);
	};

	const onTabClick = (tab: string) => {
		setCurrent(tab);
		document.getElementById(tab)?.scrollIntoView({behavior: 'smooth'});
	};

	const handleContainerScroll = useCallback(() => {
		const bunScrollTop = bunListRef.current?.getBoundingClientRect().top || 0;
		const bunHeight = bunListRef.current?.clientHeight || 0;
		const sauceScrollTop = sauceListRef.current?.getBoundingClientRect().top || 0;

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
				{/*@ts-ignore*/}
				<Tab
					value='bun'
					active={current === 'bun'}
					onClick={(value) => onTabClick(value)}>
					Булки
				</Tab>
				{/*@ts-ignore*/}
				<Tab
					value='sauce'
					active={current === 'sauce'}
					onClick={(value) => onTabClick(value)}>
					Соусы
				</Tab>
				{/*@ts-ignore*/}
				<Tab
					value='main'
					active={current === 'main'}
					onClick={(value) => onTabClick(value)}>
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
