import React from 'react';
import {useState, useContext} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientsContext from '../../context/ingredients-context';

function BurgerIngredients({ setModalVisibility }) {
	const { ingredients } = useContext(IngredientsContext);
	const [current, setCurrent] = useState('bun');
	const ingredientsTypeBun = ingredients.filter((ingredient) => ingredient.type === 'bun');
	const ingredientsTypeMain = ingredients.filter((ingredient) => ingredient.type === 'main');
	const ingredientsTypeSauce = ingredients.filter((ingredient) => ingredient.type === 'sauce');

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
					ingredients={ingredientsTypeBun}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="main"
					title='Начинки'
					ingredients={ingredientsTypeMain}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="sauce"
					title='Соусы'
					ingredients={ingredientsTypeSauce}
					setModalVisibility={setModalVisibility}
				/>
			</div>
		</section>
	)
}

BurgerIngredients.propTypes = {
	setModalVisibility: PropTypes.func.isRequired
}

export default BurgerIngredients;