import React from 'react';
import {useState, useContext} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientsContext from '../../context/ingredients-context';

const BurgerIngredients = React.memo(({ setModalVisibility }) => {
	const ingredients = useContext(IngredientsContext).ingredients;
	const [current, setCurrent] = useState('bun');

	const ingredientFilter = (ingredients, type) => {
		return ingredients.filter((ingredient) => ingredient.type === type);
	};

	return (
		<section>
			<h1 className="text text_type_main-large pt-10 pb-5">
				Соберите бургер
			</h1>
			<div className={`${styles.tabs} mb-10`}>
				<Tab
					value="bun"
					active={current === 'bun'}
					onClick={setCurrent}>
					Булки
				</Tab>
				<Tab
					value="sauce"
					active={current === 'sauce'}
					onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab
					value="main"
					active={current === 'main'}
					onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={styles.container}>
				<IngredientsCategory
					type="bun"
					title='Булки'
					ingredients={ingredientFilter(ingredients, 'bun')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="main"
					title='Начинки'
					ingredients={ingredientFilter(ingredients, 'main')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="sauce"
					title='Соусы'
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