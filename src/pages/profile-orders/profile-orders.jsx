import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileOrdersList from '../../components/profile-orders-list/profile-orders-list';
import styles from './pofile-orders.module.css';

const ProfileOrders = () => {
	return (
		<main className={styles.main}>
			<ProfileMenu />
			<ProfileOrdersList />
		</main>
	)
}

export default ProfileOrders;