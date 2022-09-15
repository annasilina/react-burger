import React from 'react';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {Link} from 'react-router-dom';

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
					onChange={(e) => setEmailValue(e.target.value)}
				/>
				<PasswordInput
					value={passwordValue}
					name={'password'}
					onChange={(e) => setPasswordValue(e.target.value)}
				/>
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
					>
						Войти
					</Button>
				</span>
			</form>
			<p className={"text text_type_main-default text_color_inactive pb-4"}>
				Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
			</p>
			<p className={"text text_type_main-default text_color_inactive"}>
				Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
			</p>
		</main>
	)
}

export default Login;