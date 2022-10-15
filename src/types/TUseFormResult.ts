import {TFormValues} from "./TFormValues";
import React, {Dispatch, SetStateAction} from "react";

export type TUseFormResult = {
	values: TFormValues;
	setValues: Dispatch<SetStateAction<TFormValues>>;
	handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}