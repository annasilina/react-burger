import React from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {links} from '../../utils/links';

const RegisterPage = () => {
	const [emailValue, setEmailValue] = React.useState('');
	const [nameValue, setNameValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');

	return (
		<main className={styles.main}>
			<form className={styles.form}>
				<h1 className={'text text_type_main-medium'}>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={nameValue}
					name={'username'}
					icon={undefined}
					size={'default'}
					onChange={(e) => setNameValue(e.target.value)}
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
			<p className={"text text_type_main-default text_color_inactive"}>
				Уже зарегистрированы? <Link to={links.login} className={styles.link}>Войти</Link>
			</p>
		</main>
	)
}

export default RegisterPage;