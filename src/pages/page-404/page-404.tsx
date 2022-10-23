import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {links} from '../../utils/constants';
import styles from './page-404.module.css';
import page404 from '../../images/page-404.png';

const Page404: FC = () => {
	return (
		<main className={styles.main}>
			<h1 className='text text_type_main-medium'>
				Страница не найдена, увы :(
			</h1>
			<img src={page404} alt='page not found' className={styles.img}/>
			<p className='text text_type_main-medium text_color_inactive'>
				Может,&#129;
				<Link
					to={links.home}
					className={`${styles.link} text text_type_main-medium`}
				>
					бургер&#129;
				</Link>
				поможет?
			</p>
		</main>
	);
};

export default Page404;
