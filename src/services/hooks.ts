import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {AppDispatch, AppThunk, RootState} from './types';

export const useTSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useTDispatch:() => AppDispatch | AppThunk = dispatchHook;
