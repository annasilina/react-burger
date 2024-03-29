import {store} from '../store';
import {TIngredientsActions} from "../actions/burger-ingredients";
import {ThunkAction} from "redux-thunk";
import {Action, ActionCreator} from 'redux';
import {rootReducer} from "../reducers";
import {TCreateOrderActions} from "../actions/order-details";
import {TConstructorActions} from "../actions/constructor";
import {TWebSocketActions} from "../actions/webSocket";
import {TWebSocketAuthActions} from "../actions/webSocketAuth";
import {TAuthActions} from "../actions/auth";

export type RootState = ReturnType<typeof rootReducer>

type TAppActions =
	| TIngredientsActions
	| TCreateOrderActions
	| TConstructorActions
	| TAuthActions
	| TWebSocketActions
	| TWebSocketAuthActions;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TAppActions>>;