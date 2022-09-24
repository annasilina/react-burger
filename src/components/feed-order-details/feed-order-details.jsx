import {useParams} from 'react-router-dom';
import {ordersFeed} from '../../utils/constants';

const FeedOrderDetails = () => {
	const {id} = useParams();
	const orders = ordersFeed.orders;

	const order = orders.find(order => order._id === id)

	return (
		<p>Что-то будет</p>
	)
}

export default FeedOrderDetails;