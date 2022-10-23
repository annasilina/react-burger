import React, {FormEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {login} from '../../services/actions/auth';
import {links} from '../../utils/constants';
import {useTDispatch, useTSelector} from '../../services/hooks';

const Login = () => {
	const [valueUserEmail, setValueUserEmail] = useState<string>('');
	const [valueUserPassword, setValueUserPassword] = useState<string>('');
	const authData = useTSelector(state => state.authData);
	const dispatch = useTDispatch();
	// const {values, setValues, handleFormChange} = useForm({
	// 	userEmail: '',
	// 	userPassword: '',
	// });

	const handleFormSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formValues = {
			email: form.userEmail.value,
			password: form.userPassword.value,
		};
		dispatch(login(formValues));
		setValueUserEmail('');
		setValueUserPassword('');
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<Input
					type='email'
					placeholder='E-mail'
					value={valueUserEmail}
					name='userEmail'
					icon={undefined}
					onChange={(evt)=>setValueUserEmail(evt.target.value)}
				/>
				<PasswordInput
					value={valueUserPassword}
					name='userPassword'
					onChange={(evt)=>setValueUserPassword(evt.target.value)}
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
				Вы — новый пользователь?&#129;
				<Link to={links.register} className={styles.link}>
					Зарегистрироваться
				</Link>
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Забыли пароль?&#129;
				<Link to={links.forgotPassword} className={styles.link}>
					Восстановить пароль
				</Link>
			</p>
		</main>
	);
};

export default Login;
