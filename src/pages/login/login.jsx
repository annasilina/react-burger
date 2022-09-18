import React from 'react';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {Link, Redirect, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {login} from '../../services/actions/auth';
import {links} from '../../utils/constants';

const Login = () => {
	const authData = useSelector(state => state.authData);
	const dispatch = useDispatch();
	const location = useLocation();
	const [formValues, setFormValues] = useState({
		email: '',
		password: ''
	});

	const handleFormChange = (evt) => {
		evt.preventDefault();
		setFormValues({...formValues, [evt.target.name]: evt.target.value})
	}

	const handleFormSubmit = useCallback(
		evt => {
			evt.preventDefault();
			dispatch(login(formValues))
		},
		[dispatch, formValues]
	)

	if (authData.userData) {
		return <Redirect to={location?.state?.from || links.home} />
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
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
				Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
			</p>
			<p className={"text text_type_main-default text_color_inactive"}>
				Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
			</p>
		</main>
	)
}

export default Login;