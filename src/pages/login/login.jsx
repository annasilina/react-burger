import React, {useState} from 'react';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {Link} from 'react-router-dom';
import {links} from '../../utils/constants';

const Login = () => {
	const [formValues, setFormValues] = useState({
		email: '',
		password: ''
	});

	const handleFormChange = (evt) => {
		evt.preventDefault();
		setFormValues({...formValues, [evt.target.name]: evt.target.value})
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} >
				<h1 className={'text text_type_main-medium'}>Вход</h1>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					value={formValues.email}
					name={'email'}
					icon={undefined}
					onChange={handleFormChange}
				/>
				<PasswordInput
					value={formValues.password}
					name={'password'}
					onChange={handleFormChange}
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
				Вы — новый пользователь? <Link to={links.register} className={styles.link}>Зарегистрироваться</Link>
			</p>
			<p className={"text text_type_main-default text_color_inactive"}>
				Забыли пароль? <Link to={links.forgotPassword} className={styles.link}>Восстановить пароль</Link>
			</p>
		</main>
	)
}

export default Login;