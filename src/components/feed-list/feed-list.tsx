import FeedCard from './feed-card';
import styles from './feed-list.module.css'
import {TOrder} from "../../types/data";
import {FC} from "react";

interface IFeedListProps {
	orders: Array<TOrder>
}

const FeedList: FC<IFeedListProps> = ({orders}) => {
	return (
		<section>
			<div className={styles.container}>
			<ul className={styles.cardsList}>
				{orders.map((order) => (
					<FeedCard key={order._id} order={order}/>
				))}
			</ul>
			</div>
		</section>
	)
}


export default FeedList;