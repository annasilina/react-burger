import React from 'react';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../services/actions/auth';
import {links} from '../../utils/constants';
import {Link} from 'react-router-dom';

const Login = () => {
	const authData = useSelector((state) => state.authData);
	const dispatch = useDispatch();
	const {values, setValues, handleFormChange} = useForm({
		email: '',
		password: '',
	});

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const formValues = {
			email: form.email.value,
			password: form.password.value,
		};

		dispatch(login(formValues));
		setValues({
			email: '',
			password: '',
		});
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<Input
					type='email'
					placeholder='E-mail'
					value={values.email}
					name='email'
					icon={undefined}
					onChange={handleFormChange}
				/>
				<PasswordInput
					value={values.password}
					name='password'
					onChange={handleFormChange}
				/>
				<span className='mb-20'>
          <Button
						type='primary'
						size='medium'
						htmlType='submit'
						{...!authData.isAuthLoading
							? {disabled: false, children: 'Войти'}
							: {disabled: true, children: 'Загрузка...'}}
					/>
							</span>
			</form>
			<p className='text text_type_main-default text_color_inactive pb-4'>
				Вы — новый пользователь?
				<Link to={links.register} className={styles.link}>
					Зарегистрироваться
				</Link>
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Забыли пароль?
				<Link to={links.forgotPassword} className={styles.link}>
					Восстановить пароль
				</Link>
			</p>
		</main>
	);
};

export default Login;
