import React from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
	const [emailValue, setEmailValue] = React.useState('');

	return (
		<main className={styles.main}>
			<form className={styles.form}>
				<h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
				<Input
					type={'email'}
					placeholder={'Укажите e-mail'}
					value={emailValue}
					name={'email'}
					icon={undefined}
					size={'default'}
					onChange={(e) => setEmailValue(e.target.value)}
				/>
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
					>
						Восстановить
					</Button>
				</span>
			</form>
			<p className={"text text_type_main-default text_color_inactive"}>
				Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
		</main>
	)
}

export default ForgotPassword;