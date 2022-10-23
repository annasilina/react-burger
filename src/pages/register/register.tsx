import React, {FormEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import styles from './register.module.css';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import {links} from '../../utils/constants';
import {registration} from '../../services/actions/auth';
import ErrorMessage from '../../components/error-message/error-message';
import {useTDispatch, useTSelector} from '../../services/hooks';

const RegisterPage = () => {
	const authData = useTSelector(state => state.authData);
	const dispatch = useTDispatch();
	const history = useHistory();
	const [valueUserName, setValueUserName] = useState<string>('');
	const [valueUserEmail, setValueUserEmail] = useState<string>('');
	const [valueUserPassword, setValueUserPassword] = useState<string>('');

	const handleFormSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		const form = evt.target as HTMLFormElement;
		const formValues = {
			name: form.userName.value,
			email: form.email.value,
			password: form.password.value,
		};

		dispatch(registration(formValues))
			if (!authData.isRegisterFailed) {
				history.push(links.profile);
			}
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					type='text'
					name='userName'
					placeholder='Имя'
					value={valueUserName}
					icon={undefined}
					size='default'
					onChange={(evt) => setValueUserName(evt.target.value)}
				/>
				<Input
					type='email'
					placeholder='E-mail'
					value={valueUserEmail}
					name='userEmail'
					icon={undefined}
					size='default'
					onChange={(evt) => setValueUserEmail(evt.target.value)}
				/>
				<PasswordInput
					value={valueUserPassword}
					name='userPassword'
					onChange={(evt) => setValueUserPassword(evt.target.value)}
				/>
				{authData.isRegisterFailed && (
					<ErrorMessage errorMessage={authData.registerErrorMessage}/>
				)}
				<span className='mb-20'>
          <Button
						type='primary'
						size='medium'
						htmlType='submit'
						{...(!authData.isRegisterLoading
							? {disabled: false, children: 'Зарегистрироваться'}
							: {
								disabled: true,
								children: 'Регистрация...',
							})}
					></Button>
        </span>
			</form>
			<p className='text text_type_main-default text_color_inactive'>
				Уже зарегистрированы?&#129;
				<Link to={links.login} className={styles.link}>
					Войти
				</Link>
			</p>
		</main>
	);
};

export default RegisterPage;
