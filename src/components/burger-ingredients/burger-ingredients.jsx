import React, {useRef} from 'react';
import {useState} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import {useSelector} from 'react-redux';

const BurgerIngredients = React.memo(({ setModalVisibility }) => {
	console.log('tick ingredients');

	const ingredients = useSelector(state => state.burger.ingredients)
	const [current, setCurrent] = useState('bun');

	const bunListRef = useRef(null);
	const sauceListRef = useRef(null);

	const ingredientFilter = (ingredients, type) => {
		return ingredients.filter((ingredient) => ingredient.type === type);
	};

	const onTabClick = (tab) => {
		setCurrent(tab);
		document.getElementById(tab).scrollIntoView({behavior: 'smooth'});
	}

	const handleContainerScroll = () => {
		const bunScrollTop = bunListRef.current.getBoundingClientRect().top;
		const sauceScrollTop = sauceListRef.current.getBoundingClientRect().top;

		if (bunScrollTop > 1) {
			setCurrent('bun');
		} else if (sauceScrollTop > 0 ) {
			setCurrent('sauce');
		} else {
			setCurrent('main');
		}
	}

	return (
		<section>
			<h1 className="text text_type_main-large pt-10 pb-5">
				Соберите бургер
			</h1>
			<div className={`${styles.tabs} mb-10`}>
				<Tab
					value="bun"
					active={current === 'bun'}
					onClick={onTabClick}>
					Булки
				</Tab>
				<Tab
					value="sauce"
					active={current === 'sauce'}
					onClick={onTabClick}>
					Соусы
				</Tab>
				<Tab
					value="main"
					active={current === 'main'}
					onClick={onTabClick}>
					Начинки
				</Tab>
			</div>
			<div className={styles.container} onScroll={handleContainerScroll}>
				<IngredientsCategory
					type='bun'
					title='Булки'
					ref={bunListRef}
					ingredients={ingredientFilter(ingredients, 'bun')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type='sauce'
					title='Соусы'
					ref={sauceListRef}
					ingredients={ingredientFilter(ingredients, 'sauce')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type='main'
					title='Начинки'
					ingredients={ingredientFilter(ingredients, 'main')}
					setModalVisibility={setModalVisibility}
				/>
			</div>
		</section>
	)
});

BurgerIngredients.propTypes = {
	setModalVisibility: PropTypes.func.isRequired
}

export default BurgerIngredients;