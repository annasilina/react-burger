import {useState} from 'react';

export const useForm = (formValues) => {
	const [values, setValues] = useState(formValues);

	const handleFormChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	return {values, setValues, handleFormChange}
}
