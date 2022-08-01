import React, {useRef} from 'react';
import {useState, useContext} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientsContext from '../../context/ingredients-context';

const BurgerIngredients = React.memo(({ setModalVisibility }) => {
	console.log('tick ingredients');

	const ingredients = useContext(IngredientsContext).ingredients;
	const [current, setCurrent] = useState('bun');
	const bunListRef = useRef(null);
	const mainListRef = useRef(null);
	const sauceListRef = useRef(null);
	const containerRef = useRef(null);

	const ingredientFilter = (ingredients, type) => {
		return ingredients.filter((ingredient) => ingredient.type === type);
	};

	const handleTabScroll = (ref) => {
			ref.current.scrollIntoView({behavior: 'smooth'});
	}

	const handleContainerScroll = () => {
		const scrollTop = containerRef.current.scrollTop;

		const bunHeight = bunListRef.current.clientHeight;
		const sauceHeight = sauceListRef.current.clientHeight;

		if (scrollTop < bunHeight) {
			setCurrent('bun');
		} else if (scrollTop > bunHeight + sauceHeight) {
			setCurrent('main');
		} else {
			setCurrent('sauce');
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
					onClick={(event) => {
						handleTabScroll(bunListRef);
						setCurrent(event);
					}}>
					Булки
				</Tab>
				<Tab
					value="sauce"
					active={current === 'sauce'}
					onClick={(event) => {
						handleTabScroll(sauceListRef);
						setCurrent(event);
					}}>
					Соусы
				</Tab>
				<Tab
					value="main"
					active={current === 'main'}
					onClick={(event) => {
						handleTabScroll(mainListRef);
						setCurrent(event);
					}}>
					Начинки
				</Tab>
			</div>
			<div className={styles.container} ref={containerRef} onScroll={handleContainerScroll}>
				<IngredientsCategory
					type="bun"
					title='Булки'
					ref={bunListRef}
					ingredients={ingredientFilter(ingredients, 'bun')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="sauce"
					title='Соусы'
					ref={sauceListRef}
					ingredients={ingredientFilter(ingredients, 'sauce')}
					setModalVisibility={setModalVisibility}
				/>
				<IngredientsCategory
					type="main"
					title='Начинки'
					ref={mainListRef}
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