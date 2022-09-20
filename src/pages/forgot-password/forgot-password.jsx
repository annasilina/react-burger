import React from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {links} from '../../utils/constants';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPasswordAction} from '../../services/actions/auth';

const ForgotPasswordPage = () => {
	const refreshToken = localStorage.getItem('refreshToken');
	const location = useLocation();
	const authData = useSelector(state => state.authData);
	const history = useHistory();
	const dispatch = useDispatch();
	const {values, setValues, handleFormChange} = useForm({
		email: ''
	})
	
	if (refreshToken) {
		return <Redirect to={location.state?.from || links.home} />
	}

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;

		dispatch(forgotPasswordAction(form.email.value))
			.finally(() => {
				if (!authData.isForgotPasswordFailed) {
					history.push(links.resetPassword);
					localStorage.setItem('resetPasswordStatus', 'requested')
				}
			})
		setValues({email: ''});
	}

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
				<Input
					type={'email'}
					placeholder={'Укажите e-mail'}
					value={values.email}
					name={'email'}
					icon={undefined}
					size={'default'}
					onChange={handleFormChange}
				/>
				<span className={'mb-20'}>
					<Button
						type={'primary'}
						size={'medium'}
						htmlType={'submit'}
						{...authData.isForgotPasswordLoading
							? {children: 'Отправка...', disabled: true}
							:	{children: 'Восстановить', disabled: false}
						}>
					</Button>
				</span>
			</form>
			<p className={'text text_type_main-default text_color_inactive'}>
				Вспомнили пароль? <Link to={links.login}
																className={styles.link}>Войти</Link></p>
		</main>
	)
}

export default ForgotPasswordPage;