import React, {useEffect, useState} from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import {useForm} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../services/actions/auth';
import ErrorMessage from '../error-message/error-message';

const ProfileForm = () => {
	const [visible, setVisible] = useState(false);
	const authData = useSelector(state => state.authData);
	const dispatch = useDispatch();
	const {values, setValues, handleFormChange} = useForm({
		name: authData.user.name || '',
		email: authData.user.email || '',
		password: ''
	})

	useEffect(() => {
		if (values.name === authData.user.name && values.email === authData.user.email && values.password === '') {
			setVisible(false);
		} else setVisible(true);
	}, [values]);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const formValues = {
			name: form.name.value,
			email: form.email.value,
			password: form.password.value,
		}

		dispatch(setUserData(formValues));
		setVisible(false);
	}

	const handleFormReset = (evt) => {
		evt.preventDefault();

		setValues({
			name: authData.user.name,
			email:authData.user.email,
			password: ''
		})
	}

	return (
		<form className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
			<Input
				type={'text'}
				name={'name'}
				placeholder={'Имя'}
				value={values.name}
				icon={'EditIcon'}
				size={'default'}
				onChange={handleFormChange}
			/>
			<Input
				type={'email'}
				name={'email'}
				placeholder={'Логин'}
				value={values.email}
				icon={'EditIcon'}
				size={'default'}
				onChange={handleFormChange}
			/>
			<Input
				type={'password'}
				name={'password'}
				placeholder={'Пароль'}
				value={values.password}
				icon={'EditIcon'}
				size={'default'}
				onChange={handleFormChange}
			/>
			{authData.isUserDataFailed &&
				<ErrorMessage errorMessage={authData.userDataErrorMessage} />
			}
			<div className={styles.buttonsContainer} style={{opacity: visible ? 1 : 0}}>
				<Button
					type={'secondary'}
					size={'medium'}
					htmlType={'reset'}
					disabled={!visible}
				>
					Отмена
				</Button>
				<Button
					type={'primary'}
					size={'medium'}
					htmlType={'submit'}
					disabled={!visible}
					{...authData.isUserDataLoading ? {children: 'Сохранение...', disabled: true} : {
						children: 'Сохранить',
						disabled: false
					}}
				>
				</Button>
			</div>
		</form>
	)
}

export default ProfileForm;