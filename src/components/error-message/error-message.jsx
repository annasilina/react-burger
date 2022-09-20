import styles from './error-message.module.css';
import React from 'react';

const ErrorMessage = ({errorMessage}) => {

	return (
		<div className={styles.messageContainer}>
			<p className="text text_type_main-small">Что-то пошло не так. {errorMessage}</p>
			<p className="text text_type_main-small">Пожалуйста, попробуйте еще раз, или обновите страницу</p>
		</div>
	)
}

export default ErrorMessage