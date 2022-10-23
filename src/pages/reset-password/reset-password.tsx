import React, {FormEvent, useState} from 'react';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {Button, Input,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import {links} from '../../utils/constants';
import {resetPasswordAction} from '../../services/actions/auth';
import {useTDispatch, useTSelector} from '../../services/hooks';

const ResetPasswordPage = () => {
	const resetPasswordStatus = localStorage.getItem('resetPasswordStatus');
	const [valueUserPassword, setValueUserPassword] = useState<string>('');
	const [valueToken, setValueToken] = useState<string>('');
	const authData = useTSelector(state => state.authData);
	const dispatch = useTDispatch();
	const location = useLocation();
	const state = location.state as { from: Location };
	const fromPage = state?.from?.pathname || links.home;
	const history = useHistory();

	if (!resetPasswordStatus) {
		return <Redirect to={fromPage || links.home}/>;
	}

	const handleFormSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formValues = {
			password: form.password.value,
			token: form.token.value,
		};

		dispatch(resetPasswordAction(formValues))
			if (!authData.isResetPasswordFailed) {
				history.push(links.login);
				localStorage.clear();
			}
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<Input
					type='password'
					value={valueUserPassword}
					placeholder='Введите новый пароль'
					name='password'
					size='default'
					onChange={(evt) => setValueUserPassword(evt.target.value)}
				/>
				<Input
					type='text'
					placeholder='Введите код из письма'
					value={valueToken}
					name='token'
					icon={undefined}
					size='default'
					onChange={(evt) => setValueToken(evt.target.value)}
				/>
				<span className='mb-20'>
					{/* @ts-ignore*/}
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
