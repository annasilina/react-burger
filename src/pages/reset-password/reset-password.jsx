import React from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordAction} from '../../services/actions/auth';

const ResetPasswordPage = () => {
	/*const refreshToken = localStorage.getItem('refreshToken');*/
	const resetPasswordStatus = localStorage.getItem('resetPasswordStatus');
	const location = useLocation();
	const authData = useSelector(state => state.authData)
	const history = useHistory();
	const dispatch = useDispatch();
	const { values, handleFormChange } = useForm({
		password: '',
		token: ''
	})

	if (!resetPasswordStatus) {
		return <Redirect to={location.state?.from || links.home} />
	}

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const formValues = {
			password: form.password.value,
			token: form.token.value
		}

		dispatch(resetPasswordAction(formValues))
			.finally(() => {
				if (!authData.isResetPasswordFailed) {
					history.push(links.login);
					localStorage.clear();
				}
			})
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
				<PasswordInput
					value={values.password}
					placeholder={'Введите новый пароль'}
					name={'password'}
					size={'default'}
					onChange={handleFormChange}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					value={values.token}
					name={'token'}
					icon={undefined}
					size={'default'}
					onChange={handleFormChange}
				/>
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
					>
						Сохранить
					</Button>
				</span>
			</form>
			<p className={'text text_type_main-default text_color_inactive'}>
				Вспомнили пароль? <Link to={links.login}
																className={styles.link}>Войти</Link>
			</p>
		</main>
	)
}

export default ResetPasswordPage;