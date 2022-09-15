import React from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';

const ProfileForm = () => {
	const [nameValue, setNameValue] = React.useState('');
	const [emailValue, setEmailValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');

	return (
		<form className={styles.form}>
			<Input
				type={'text'}
				name={'name'}
				placeholder={'Имя'}
				value={nameValue}
				icon={'EditIcon'}
				size={'default'}
				onChange={(e) => setNameValue(e.target.value)}
			/>
			<Input
				type={'email'}
				name={'email'}
				placeholder={'Логин'}
				value={emailValue}
				icon={'EditIcon'}
				size={'default'}
				onChange={(e) => setEmailValue(e.target.value)}
			/>
			<Input
				type={'password'}
				name={'password'}
				placeholder={'Пароль'}
				value={passwordValue}
				icon={'EditIcon'}
				size={'default'}
				onChange={(e) => setPasswordValue(e.target.value)}
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