import React from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
	const [emailValue, setEmailValue] = React.useState('');
	const [usernameValue, setUsernameValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');

	return (
		<main className={styles.main}>
			<form className={styles.form}>
				<h1 className={'text text_type_main-medium'}>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={usernameValue}
					name={'username'}
					icon={undefined}
					size={'default'}
					onChange={(e) => setUsernameValue(e.target.value)}
				/>
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
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
					>
						Зарегистрироваться
					</Button>
				</span>
			</form>
			<p className={"text text_type_main-default text_color_inactive"}>Уже зарегистрированы? <a href="/react-burger/" className={styles.link}>Войти</a></p>
		</main>
	)
}

export default Register;