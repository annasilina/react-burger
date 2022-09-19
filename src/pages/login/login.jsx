import React, {useCallback} from 'react';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {Link, Redirect, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth} from '../../services/actions/auth';
import {getCookie} from '../../utils/cookie';

const Login = () => {
	const cookie = getCookie('accessToken');
	const authData = useSelector(state => state.authData);
	const dispatch = useDispatch();
	const location = useLocation();

	const { values, setValues, handleFormChange } = useForm({
		email: authData.user.email || '',
		password: authData.user.password || ''
	})

	const newLogin = useCallback((evt, formValues) => {
			evt.preventDefault();

			dispatch(getAuth(formValues));
			setValues({
				email: '',
				password: ''
			})
		}, [dispatch, setValues]
	)

	if (cookie) {
		return (
			<Redirect to={location.state?.from || './'} />
		);
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={(evt) => newLogin(evt, values)} >
				<h1 className={'text text_type_main-medium'}>Вход</h1>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					value={values.email}
					name={'email'}
					icon={undefined}
					onChange={handleFormChange}
				/>
				<PasswordInput
					value={values.password}
					name={'password'}
					onChange={handleFormChange}
				/>
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
						{...!authData.isLoading
							? {disabled: false, children: 'Войти'}
							: {disabled: true, children: 'Загрузка...'}
						}
					/>
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