import React, {useCallback, useState} from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import {links} from '../../utils/constants';
import {register} from '../../services/actions/auth';
import {useDispatch, useSelector} from 'react-redux';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const authData = useSelector(state => state.authData);
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		password: ''
	})

	const handleFormChange = (evt) => {
		evt.preventDefault();
		setFormValues({...formValues, [evt.target.name]: evt.target.value})
	}

	const handleFormSubmit = useCallback(
			evt => {
				evt.preventDefault();
				dispatch(register(formValues))
			},
		[dispatch, formValues]
	)

	if (authData.userData) {
		return <Redirect to={links.home} />
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className={'text text_type_main-medium'}>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={formValues.name}
					name={'name'}
					icon={undefined}
					size={'default'}
					onChange={handleFormChange}
				/>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					value={formValues.email}
					name={'email'}
					icon={undefined}
					size={'default'}
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