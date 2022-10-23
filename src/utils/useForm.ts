import {TFormValues} from "../types/TFormValues";
import {TUseFormResult} from "../types/TUseFormResult";
import React, {useState} from "react";

export const useForm = (formValues: TFormValues): TUseFormResult => {
	const [values, setValues] = useState<TFormValues>(formValues);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValues({...values, [e.target.name]: e.target.value});
	};

	return {values, setValues, handleFormChange};
};