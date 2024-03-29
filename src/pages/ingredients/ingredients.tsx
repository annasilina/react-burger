import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredients.module.css';
import React, {FC} from 'react';

const IngredientsPage: FC = () => {
	return (
		<>
			<main className={styles.main}>
				<h1 className='text text_type_main-large'>Детали ингредиента</h1>
				<IngredientDetails/>
			</main>
		</>
	);
};

export default IngredientsPage;
