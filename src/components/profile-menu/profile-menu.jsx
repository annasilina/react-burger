import React from 'react';
import {Link} from 'react-router-dom';
import styles from './profile-menu.module.css';


const ProfileMenu = () => {
	return (
		<nav className={`${styles.menu} pl-5`}>
			<ul className={styles.menuList}>
				<li>
					<Link to="/profile" className={`${styles.menuLink} `}>
						<p className={'text text_type_main-medium'}>Профиль</p>
					</Link>
				</li>
				<li>
					<Link to="/" className={`${styles.menuLink} `}>
						<p className={'text text_type_main-medium text_color_inactive'}>История заказов</p>
					</Link>
				</li>
				<li>
					<Link to="/" className={`${styles.menuLink} `}>
						<p className={'text text_type_main-medium text_color_inactive'}>Выход</p>
					</Link>
				</li>
			</ul>
			<p className={"text text_type_main-default text_color_inactive mt-20"}>В этом разделе вы можете
				изменить свои персональные данные</p>
		</nav>
	)
}

export default ProfileMenu;