import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';
import {useSelector} from 'react-redux';
import Preloader from '../../components/preloader/preloader';

const Profile = () => {
	const userData = useSelector(state => state.authData);

	return (
		<>
			{userData.isUserLoading && <Preloader />}
			{!userData.isUserLoading && (
				<main className={styles.main}>
					<ProfileMenu/>
					<ProfileForm/>
				</main>
			)}
		</>
	);
};

export default Profile;
