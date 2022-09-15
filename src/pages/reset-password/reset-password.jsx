import React from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {
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
			<p className={"text text_type_main-default text_color_inactive"}>Вспомнили пароль? <a href="/react-burger/" className={styles.link}>Войти</a></p>
		</main>
	)
}

export default ResetPassword;