import React, {useRef} from 'react';
import {useState, useContext} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientsContext from '../../context/ingredients-context';

const BurgerIngredients = React.memo(({ setModalVisibility }) => {
	const ingredients = useContext(IngredientsContext).ingredients;
	const [current, setCurrent] = useState('bun');
	const bunListRef = useRef(null);
	const mainListRef = useRef(null);
	const sauceListRef = useRef(null);

	const ingredientFilter = (ingredients, type) => {
		return ingredients.filter((ingredient) => ingredient.type === type);
	};

	const handleScroll = (ref) => {
			ref.current.scrollIntoView({behavior: 'smooth'});
	}

	const handleTabClick = (event) => {
		setCurrent(event);

		if (event === 'bun') {
			handleScroll(bunListRef);
		} else if (event === 'sauce') {
			handleScroll(sauceListRef);
		} else {
			handleScroll(mainListRef);
		}
	}

	console.log('tick ingredients');

	return (
		<section>
			<h1 className="text text_type_main-large pt-10 pb-5">
				Соберите бургер
			</h1>
			<div className={`${styles.tabs} mb-10`}>
				<Tab
					value="bun"
					active={current === 'bun'}
					onClick={handleTabClick}>
					Булки
				</Tab>
				<Tab
					value="sauce"
					active={current === 'sauce'}
					onClick={handleTabClick}>
					Соусы
				</Tab>
				<Tab
					value="main"
					active={current === 'main'}
					onClick={handleTabClick}>
					Начинки
				</Tab>
			</div>
			<div className={styles.container}>
				<IngredientsCategory
					type="bun"
					title='Булки'
					ref={bunListRef}
					ingredients={ingredientFilter(ingredients, 'bun')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="main"
					title='Начинки'
					ref={mainListRef}
					ingredients={ingredientFilter(ingredients, 'main')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="sauce"
					title='Соусы'
					ref={sauceListRef}
					ingredients={ingredientFilter(ingredients, 'sauce')}
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