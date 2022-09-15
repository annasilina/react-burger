import React from 'react';
import styles from './profile-menu.module.css';

const ProfileMenu = () => {
	return (
		<nav className={`${styles.menu} pl-5`}>
			<ul className={styles.menuList}>
				<li>
					<a href="/react-burger/" className={`${styles.menuLink} `}>
						<p className={'text text_type_main-medium'}>Профиль</p>
					</a>
				</li>
				<li>
					<a href="/react-burger/" className={`${styles.menuLink} `}>
						<p className={'text text_type_main-medium text_color_inactive'}>История заказов</p>
					</a>
				</li>
				<li>
					<a href="/react-burger/" className={`${styles.menuLink} `}>
						<p className={'text text_type_main-medium text_color_inactive'}>Выход</p>
					</a>
				</li>
			</ul>
			<p className={"text text_type_main-default text_color_inactive mt-20"}>В этом разделе вы можете
				изменить свои персональные данные</p>
		</nav>
	)
}

export default ProfileMenu;