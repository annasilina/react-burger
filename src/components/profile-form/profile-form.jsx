import React from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import {useForm} from '../../utils/hooks';
import {useSelector} from 'react-redux';

const ProfileForm = () => {
	/*const [nameValue, setNameValue] = React.useState('');
	const [emailValue, setEmailValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');*/
	const authData = useSelector(state => state.authData);
	/*const dispatch = useDispatch();*/
	const {values, setValues, handleFormChange } = useForm({
		name: authData.user.name,
		email: authData.user.email,
		password: ''
	})

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

	}

	const handleFormReset = (evt) => {
		evt.preventDefault();

	}

	return (
		<form className={styles.form}>
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
			<div className={styles.buttonsContainer}>
				<Button
					type={'secondary'}
					size={'medium'}
					htmlType={'reset'}
				>
					Отмена
				</Button>
				<Button
					type={'primary'}
					size={'medium'}
					htmlType={'submit'}>
					Сохранить
				</Button>
			</div>
		</form>
	)
}

export default ProfileForm;