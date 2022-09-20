import {Link} from 'react-router-dom';
import {links} from '../../utils/constants';
import styles from './error-element.module.css';
import React from 'react';

const ErrorElement = ({errorMessage}) => {

	return (
		<main className={styles.main}>
			<h2 className="text text_type_main-medium">Что-то пошло не так: {errorMessage.toLowerCase()}</h2>
			<p className="text text_type_main-medium"> Сейчас перенаправим вас на <Link to={links.home}
																																									className={`${styles.link} text text_type_main-medium`}>главную
				страницу</Link></p>
		</main>
	)
}

export default ErrorElement