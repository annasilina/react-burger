import styles from './feed-list.module.css';
import React from 'react';

const FeedIngredientImage = (props) => {
	const { ingredient, index, totalQty, maxVisibleQty } = props;
	const lastIngredients = totalQty - maxVisibleQty;
	const count = ingredient.count;

	return (
		<li className={styles.imagePreviewWrapper} style={{zIndex: maxVisibleQty - index}}>
			{lastIngredients !== 0 && maxVisibleQty === index + 1 && (
				<p className="text text_type_main-default" style={{ zIndex: "2" }}>
					{`+${lastIngredients}`}
				</p>
			)}
			<img
				src={ingredient.image_mobile}
				alt={ingredient.name}
				className={styles.imagePreview}
				style={{
					opacity: (lastIngredients !== 0 && maxVisibleQty === index + 1) || count > 1 ? "0.6" : "1",
					zIndex: "1"
			}}
			/>
		</li>
	)
}

export default FeedIngredientImage;