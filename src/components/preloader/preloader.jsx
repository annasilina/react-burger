import styles from './preloader.module.css';
import React from 'react';
import {Link} from 'react-router-dom';
import {links} from '../../utils/constants';

const Preloader = (props) => {
	const { type } = props;
	if (type === 'loader') {
		return (
			<div className={`${styles.main}`}>
				<div className={`${styles.spinner}`}></div>
			</div>
		);
	}

	if (type === 'error') {
		return (
			<div className={`${styles.main}`}>
				<h1 className='text text_type_main-medium'>
					Произошла ошибка. Попробуйте перезагрузить страницу, или вернуться на&#129;
					<Link
						to={links.home}
						className={`${styles.link} text text_type_main-medium`}
					>
						главную.
					</Link>
				</h1>
			</div>
		);
	}
};

export default Preloader;
