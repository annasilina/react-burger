import React from 'react';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';

const Profile = () => {
	return (
		<main className={styles.main}>
			<ProfileMenu/>
			<ProfileForm/>
		</main>
	);
};

export default Profile;
