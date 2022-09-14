import React from 'react';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

const Login = () => {
	const [emailValue, setEmailValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');

	return (
		<main className={styles.main}>
			<form className={styles.form}>
				<h1 className={'text text_type_main-medium'}>Вход</h1>
					<Input
						type={'email'}
						placeholder={'E-mail'}
						value={emailValue}
						name={'email'}
						icon={undefined}
						size={'default'}
						onChange={(e) => setEmailValue(e.target.value)}
					/>
					<PasswordInput
						value={passwordValue}
						name={'password'}
						onChange={(e) => setPasswordValue(e.target.value)}
					/>
				<span className={`${styles.button} mb-20`}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
					>
						Войти
					</Button>
				</span>
				<p className={"text text_type_main-default text_color_inactive"}>Вы — новый пользователь? <a href="/react-burger/" className={styles.link}>Зарегистрироваться</a></p>
				<p className={"text text_type_main-default text_color_inactive"}>Забыли пароль? <a href="/react-burger/" className={styles.link}>Восстановить пароль</a></p>
			</form>
		</main>
	)

}

export default Login;