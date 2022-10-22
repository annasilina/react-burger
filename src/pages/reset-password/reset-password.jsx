import React from 'react';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import {links} from '../../utils/constants';
import {resetPasswordAction} from '../../services/actions/auth';
import {useForm} from '../../utils/useForm';
import {useTDispatch, useTSelector} from '../../services/hooks';

const ResetPasswordPage = () => {
	const resetPasswordStatus = localStorage.getItem('resetPasswordStatus');
	const authData = useTSelector(state => state.authData);
	const dispatch = useTDispatch();
	const location = useLocation();
	const history = useHistory();
	const {values, handleFormChange} = useForm({
		password: '',
		token: '',
	});

	if (!resetPasswordStatus) {
		return <Redirect to={location.state?.from || links.home}/>;
	}

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const formValues = {
			password: form.password.value,
			token: form.token.value,
		};

		dispatch(resetPasswordAction(formValues)).finally(() => {
			if (!authData.isResetPasswordFailed) {
				history.push(links.login);
				localStorage.clear();
			}
		});
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<PasswordInput
					value={values.password}
					placeholder='Введите новый пароль'
					name='password'
					size='default'
					onChange={handleFormChange}
				/>
				<Input
					type='text'
					placeholder='Введите код из письма'
					value={values.token}
					name='token'
					icon={undefined}
					size='default'
					onChange={handleFormChange}
				/>
				<span className='mb-20'>
          <Button type='primary' size='medium' htmlType='submit'>
            Сохранить
          </Button>
        </span>
			</form>
			<p className='text text_type_main-default text_color_inactive'>
				Вспомнили пароль?&#129;
				<Link to={links.login} className={styles.link}>
					Войти
				</Link>
			</p>
		</main>
	);
};

export default ResetPasswordPage;
