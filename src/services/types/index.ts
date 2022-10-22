import {store} from '../store';
import {TIngredientsActions} from "../actions/burger-ingredients";
import {ThunkAction} from "redux-thunk";
import {Action, ActionCreator} from 'redux';
import {rootReducer} from "../reducers";
import {TCreateOrderActions} from "../actions/order-details";
import {TConstructorActions} from "../actions/constructor";

export type RootState = ReturnType<typeof rootReducer>

type TAppActions = TIngredientsActions | TCreateOrderActions | TConstructorActions;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TAppActions>>;

// export type AppDispatch = Dispatch<TAppActions>;


// // types/index.ts
// import { Dispatch } from 'redux';
// import { TTodoActions } from './actions';
//
// // Типизация всех экшенов приложения
// type TApplicationActions = TTodoActions;
//
// // Типизация метода dispatch для проверки на валидность отправляемого экшена
// export type AppDispatch = Dispatch<TApplicationActions>;