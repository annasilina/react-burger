import {
	useDispatch,
	useSelector,
	TypedUseSelectorHook
} from 'react-redux';
import {AppDispatch, AppThunk, RootState} from './types';

export const useTSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTDispatch:() => AppDispatch | AppThunk = useDispatch;
