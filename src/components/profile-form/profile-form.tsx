import React, {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import {setUser} from '../../services/actions/auth';
import ErrorMessage from '../error-message/error-message';
import Preloader from '../preloader/preloader';
import {useTDispatch, useTSelector} from '../../services/hooks';

const ProfileForm: FC = () => {
	const [visible, setVisible] = useState(false);
	const [valueUserName, setValueUserName] = useState<string>('');
	const [valueUserEmail, setValueUserEmail] = useState<string>('');
	const [valueUserPassword, setValueUserPassword] = useState<string>('');
	const authData = useTSelector(state => state.authData);
	const dispatch = useTDispatch();
	// const {values, setValues, handleFormChange} = useForm({
	// 	userName: 'userName',
	// 	userEmail: 'userEmail',
	// 	userPassword: '******',
	// });

	useEffect(() => {
		if (authData.user !== null) {
			// setValues({
			// 	userName: authData.user.name,
			// 	userEmail: authData.user.email,
			// })
			setValueUserName(authData.user.name);
			setValueUserEmail(authData.user.email);
		}
	}, [authData.user]);

	useEffect(() => {
		if (authData.user !== null)
			valueUserName === authData.user.name && valueUserEmail === authData.user.email && valueUserPassword.length === 0
		? setVisible(false)
		: setVisible(true);
	}, [valueUserName, valueUserEmail, valueUserPassword]);

	const handleFormSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formValues = {
			name: form.userName.value,
			email: form.userEmail.value,
			password: form.userPassword.value,
		};

		dispatch(setUser(formValues));
		setVisible(false);
	};

	const handleFormReset = (evt: FormEvent) => {
		evt.preventDefault();

		if (authData.user !== null) {
			setValueUserEmail(authData.user.email);
			setValueUserName(authData.user.name)
		}
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
					name='userName'
					placeholder='Имя'
					value={valueUserName}
					icon='EditIcon'
					size='default'
					onChange={(evt) => setValueUserName(evt.target.value)}
				/>
				<Input
					type='email'
					name='userEmail'
					placeholder='Логин'
					value={valueUserEmail}
					icon='EditIcon'
					size='default'
					onChange={(evt) => setValueUserEmail(evt.target.value)}
				/>
				<Input
					type='password'
					name='userPassword'
					placeholder='Пароль'
					value={valueUserPassword}
					icon='EditIcon'
					size='default'
					onChange={(evt) => setValueUserPassword(evt.target.value)}
				/>
				{authData.isUserDataFailed && (
					<ErrorMessage errorMessage={authData.userDataErrorMessage}/>
				)}
				<div
					className={styles.buttonsContainer}
					style={{opacity: visible ? 1 : 0}}
				>
					{/* @ts-ignore*/}
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
