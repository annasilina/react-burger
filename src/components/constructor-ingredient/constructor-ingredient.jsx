import React, {useRef} from 'react';

import styles from './constructor-ingredient.module.css';
import {ingredientPropTypes} from '../../types/ingredient';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from 'react-redux';
import {CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_REORDER_ITEM} from '../../services/actions/constructor';
import {DECREASE_INGREDIENT} from '../../services/actions/burger-ingredients';
import {useDrag, useDrop} from 'react-dnd';

export default function ConstructorIngredient({ ingredient, index }) {
	const dispatch = useDispatch();
	const elementRef = useRef(null);

	const [{ handlerId }, dropSelectedRef] = useDrop({
		accept: 'selected_ingredient',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item, monitor) {
			if (!elementRef.current) {
				return;
			}
			const dragItemIndex = item.index;
			const hoverItemIndex = index;

			if (dragItemIndex === hoverItemIndex) {
				return;
			}

			const hoverRect = elementRef.current?.getBoundingClientRect();
			const hoverMiddle = (hoverRect.bottom - hoverRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientHeight = clientOffset.y - hoverRect.top;

			if (dragItemIndex < hoverItemIndex && hoverClientHeight < hoverMiddle) {
				return;
			}

			if (dragItemIndex < hoverItemIndex && hoverClientHeight < hoverMiddle) {
				return;
			}

			dispatch({
				type: CONSTRUCTOR_REORDER_ITEM,
				payload: {
					dragItemIndex: dragItemIndex,
					hoverItemIndex: hoverItemIndex
				}
			})

			item.index = hoverItemIndex;
		}
	})

	const [{isDragging}, dragRef] = useDrag({
		type: 'selected_ingredient',
		item: { id: ingredient.conctructorID, index},
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	})

	dragRef(dropSelectedRef(elementRef));

	const handleDelete = (ingredient) => {
		dispatch({
			type: CONSTRUCTOR_DELETE_ITEM,
			payload: ingredient
		});
		dispatch({
			type: DECREASE_INGREDIENT,
			payload: ingredient
		})
	}

	const cursor = isDragging ? 'grabbing' : 'grab';
	/*const opacity = isDragging ? 0 : 1*/

	return (
		ingredient.type !== 'bun' &&
			<li
				ref={elementRef}
				className={`${styles.ingredientItem}`}
				style={{cursor}}
				data-handler-id={{handlerId}}
			> {!isDragging &&
				<>
					<div className="mr-2">
						<DragIcon type="primary" />
					</div>
					<ConstructorElement
						text={ingredient.name}
						thumbnail={ingredient.image}
						price={ingredient.price}
						isLocked={false}
						handleClose={() => handleDelete(ingredient)}
					/>
				</>
				}
			</li>
		)
}

ConstructorIngredient.propTypes = {
	ingredient: ingredientPropTypes.isRequired
}