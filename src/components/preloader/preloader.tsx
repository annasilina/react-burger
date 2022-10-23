import styles from './preloader.module.css';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {links} from '../../utils/constants';

interface TPreloaderProps {
	type: 'loader' | 'error';
}

const Preloader: FC<TPreloaderProps> = ({type}) => {

	return (
		<div className={`${styles.main}`}>
			{type === 'loader' &&
				<div className={`${styles.spinner}`}></div>
			}
			{type === 'error' && (
				<h1 className='text text_type_main-medium'>
					Произошла ошибка. Попробуйте перезагрузить страницу, или вернуться на&#129;
					<Link
						to={links.home}
						className={`${styles.link} text text_type_main-medium`}
					>
						главную.
					</Link>
				</h1>
			)}
		</div>
	)
};

export default Preloader;
