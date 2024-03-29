import styles from './error-message.module.css';
import React, {FC} from 'react';

interface IErrorMessage {
	errorMessage: string;
}

const ErrorMessage: FC<IErrorMessage> = ({errorMessage}) => {
	return (
		<div className={styles.messageContainer}>
			{errorMessage ? (
				<p className='text text_type_main-small'>
					Произошла ошибка: {errorMessage.toLocaleString()}
				</p>
			) : (
				<p className='text text_type_main-small'>Что-то пошло не так</p>
			)}
			<p className='text text_type_main-small'>
				Пожалуйста, попробуйте еще раз, или обновите страницу
			</p>
		</div>
	);
};

export default ErrorMessage;
