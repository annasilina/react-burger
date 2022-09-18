import React, {useCallback} from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {registration} from '../../services/actions/auth';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const authData = useSelector(state => state.authData);
	const { values, setValues, handleFormChange } = useForm({
		name: '',
		email: '',
		password: ''
	})

	const newUser = useCallback((evt, formValues) => {
			evt.preventDefault();
			dispatch(registration(formValues));
			setValues({
				name: '',
				email: '',
				password: ''
			});
		}, [dispatch, setValues]
	)

	if (authData.isAuth) {
		return (
			<Redirect to={location.state?.from || '/'} />
		);
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={(evt) => newUser(evt, values)}>
				<h1 className={'text text_type_main-medium'}>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={values.name}
					name={'name'}
					icon={undefined}
					size={'default'}
					onChange={handleFormChange}
				/>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					value={values.email}
					name={'email'}
					icon={undefined}
					size={'default'}
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
						{...!authData.isLoading ? {disabled: false, children: 'Зарегистрироваться'} : {disabled: true, children: 'Регистрация...'}}
					>
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