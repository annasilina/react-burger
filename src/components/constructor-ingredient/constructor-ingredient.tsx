import React, {FC, useRef} from 'react';
import type {Identifier, XYCoord} from "dnd-core";
import styles from './constructor-ingredient.module.css';
import {ConstructorElement, DragIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import {decreaseIngredient} from '../../services/actions/burger-ingredients';
import {useDrag, useDrop} from 'react-dnd';
import {useTDispatch} from '../../services/hooks';
import {deleteIngredientFromConstructor, reorderIngredientsInConstructor} from '../../services/actions/constructor';
import {TIngredient} from "../../types/data";

interface IConstructorIngredientProps {
	ingredient: TIngredient;
	index: number;
}

export interface DragItem {
	index: number;
	id: string;
	type: string;
}

const ConstructorIngredient: FC<IConstructorIngredientProps> = ({ingredient, index}) => {
	const dispatch = useTDispatch();
	const elementRef = useRef<HTMLLIElement>(null);

	const [{handlerId}, dropSelectedRef] = useDrop<DragItem, void, {handlerId: Identifier | null}>({
		accept: 'selected_ingredient',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
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
			const hoverClientHeight = (clientOffset as XYCoord).y - hoverRect.top;

			if (dragItemIndex < hoverItemIndex && hoverClientHeight < hoverMiddle) {
				return;
			}

			if (dragItemIndex < hoverItemIndex && hoverClientHeight < hoverMiddle) {
				return;
			}

			dispatch(reorderIngredientsInConstructor(dragItemIndex, hoverItemIndex));

			item.index = hoverItemIndex;
		},
	});

	const [{isDragging}, dragRef] = useDrag({
		type: 'selected_ingredient',
		item: {id: ingredient.constructorID, index},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	dragRef(dropSelectedRef(elementRef));

	const handleDelete = (ingredient: TIngredient): void => {
		dispatch(deleteIngredientFromConstructor(ingredient));
		dispatch(decreaseIngredient(ingredient));
	};

	const cursor = isDragging ? 'grabbing' : 'grab';

	return (
		<li
			ref={elementRef}
			className={`${styles.ingredientItem}`}
			style={{cursor}}
			data-handler-id={{handlerId}}
		>
			{!isDragging && (
				<>
					<div className='mr-2'>
						<DragIcon type='primary'/>
					</div>
					<ConstructorElement
						text={ingredient.name}
						thumbnail={ingredient.image}
						price={ingredient.price}
						isLocked={false}
						handleClose={() => handleDelete(ingredient)}
					/>
				</>
			)}
		</li>
	);
}

export default ConstructorIngredient;