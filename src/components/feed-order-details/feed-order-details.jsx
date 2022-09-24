import {useParams} from 'react-router-dom';
import {ordersFeed} from '../../utils/constants';
import {useSelector} from 'react-redux';

const FeedOrderDetails = () => {
	const allIngredientsList = useSelector(state => state.ingredientsData.ingredients);
	const {id} = useParams();
	const order = ordersFeed.orders.find(order => order._id === id)[0];

/*	const ingredientsInOrder = order.ingredients
		.map((ingredient) => {
			return (ingredient = allIngredientsList.filter(({ _id }) => ingredient.includes(_id)))[0]
		})
		.map((ingredient) => {
			return {...ingredient, uniqId: uuid()}
		})*/

	// const bunInOrder = ingredientsInOrder.filter(ingredient => ingredient.type === 'bun')[0];
	// const otherIngredients = ingredientsInOrder.filter(ingredient => ingredient.type !== 'bun');

	return (
		<p>что-то будет</p>
	)
}

export default FeedOrderDetails;
