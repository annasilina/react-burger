import React from 'react';
import {Link} from 'react-router-dom';
import {links} from '../../utils/links';
import styles from './page-404.module.css';
import page404 from '../../images/page-404.png';

const Page404 = () => {
	return (
		<main className={styles.main}>
			<h1 className='text text_type_main-medium'>Упс... Страница не найдена</h1>
			<img src={page404} alt={'page not found'} className={styles.img}/>
			<p className='text text_type_main-medium text_color_inactive'>Может, <Link to={links.home} className={`${styles.link} text text_type_main-medium`}>бургер </Link>поможет?</p>
		</main>
	)
}

export default Page404;