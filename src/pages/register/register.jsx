import React from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useHistory} from 'react-router-dom';
import {links} from '../../utils/constants';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {registration} from '../../services/actions/auth';
import ErrorMessage from '../../components/error-message/error-message';

const RegisterPage = () => {
	const authData = useSelector((state) => state.authData);
	const dispatch = useDispatch();
	const history = useHistory();
	const {values, handleFormChange} = useForm({
		name: '',
		email: '',
		password: '',
	});

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		const form = evt.target;
		const formValues = {
			name: form.name.value,
			email: form.email.value,
			password: form.password.value,
		};

		dispatch(registration(formValues)).finally(() => {
			if (!authData.isRegisterFailed) {
				history.push(links.login);
			}
		});
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					type='text'
					placeholder='Имя'
					value={values.name}
					name='name'
					icon={undefined}
					size='default'
					onChange={handleFormChange}
				/>
				<Input
					type='email'
					placeholder='E-mail'
					value={values.email}
					name='email'
					icon={undefined}
					size='default'
					onChange={handleFormChange}
				/>
				<PasswordInput
					value={values.password}
					name='password'
					onChange={handleFormChange}
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
				Уже зарегистрированы?' '
				<Link to={links.login} className={styles.link}>
					Войти
				</Link>
			</p>
		</main>
	);
};

export default RegisterPage;
