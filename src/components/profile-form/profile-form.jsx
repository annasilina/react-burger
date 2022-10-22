import React, {useEffect, useState} from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import {setUser} from '../../services/actions/auth';
import {useForm} from '../../utils/useForm';
import ErrorMessage from '../error-message/error-message';
import Preloader from '../preloader/preloader';
import {useTDispatch, useTSelector} from '../../services/hooks';

const ProfileForm = () => {
	const [visible, setVisible] = useState(false);
	const authData = useTSelector(state => state.authData);
	const dispatch = useTDispatch();
	const {values, setValues, handleFormChange} = useForm({
		name: authData.user ? authData.user.name : '',
		email: authData.user ? authData.user.email :'',
		password: '',
	});

	useEffect(() => {
		if (
			authData.user !== null &&
			values.name === authData.user.name &&
			values.email === authData.user.email &&
			values.password === ''
		) {
			setVisible(false);
		} else setVisible(true);
	}, [authData.user, values]);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const formValues = {
			name: form.name.value,
			email: form.email.value,
			password: form.password.value,
		};

		dispatch(setUser(formValues));
		setVisible(false);
	};

	const handleFormReset = (evt) => {
		evt.preventDefault();

		setValues({
			name: authData.user.name,
			email: authData.user.email,
			password: '',
		});
	};

	return {
		...(authData.isUserDataLoading ? (
			<Preloader type='loader'/>
		) : (
			<form
				className={styles.form}
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
			>
				<Input
					type='text'
					name='name'
					placeholder='Имя'
					value={values.name}
					icon='EditIcon'
					size='default'
					onChange={handleFormChange}
				/>
				<Input
					type='email'
					name='email'
					placeholder='Логин'
					value={values.email}
					icon='EditIcon'
					size='default'
					onChange={handleFormChange}
				/>
				<Input
					type='password'
					name='password'
					placeholder='Пароль'
					value={values.password}
					icon='EditIcon'
					size='default'
					onChange={handleFormChange}
				/>
				{authData.isUserDataFailed && (
					<ErrorMessage errorMessage={authData.userDataErrorMessage}/>
				)}
				<div
					className={styles.buttonsContainer}
					style={{opacity: visible ? 1 : 0}}
				>
					<Button
						type='secondary'
						size='medium'
						htmlType='reset'
						disabled={!visible}
					>
						Отмена
					</Button>
					<Button
						type='primary'
						size='medium'
						htmlType='submit'
						disabled={!visible}
						{...(authData.isUserDataLoading
							? {children: 'Сохранение...', disabled: true}
							: {
								children: 'Сохранить',
								disabled: false,
							})}
					></Button>
				</div>
			</form>
		)),
	};
};

export default ProfileForm;
