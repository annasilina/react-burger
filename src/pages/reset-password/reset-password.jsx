import React from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {links} from '../../utils/constants';

const ResetPasswordPage = () => {
	const [passwordValue, setPasswordValue] = React.useState('');
	const [codeValue, setCodeValue] = React.useState('');

	return (
		<main className={styles.main}>
			<form className={styles.form}>
				<h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
				<PasswordInput
					value={passwordValue}
					placeholder={'Введите новый пароль'}
					name={'password'}
					size={'default'}
					onChange={(e) => setPasswordValue(e.target.value)}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					value={codeValue}
					name={'code'}
					icon={undefined}
					size={'default'}
					onChange={(e) => setCodeValue(e.target.value)}
				/>
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
					>
						Сохранить
					</Button>
				</span>
			</form>
			<p className={'text text_type_main-default text_color_inactive'}>
				Вспомнили пароль? <Link to={links.login}
																className={styles.link}>Войти</Link>
			</p>
		</main>
	)
}

export default ResetPasswordPage;