import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from '../shared/uistate/ui.reducer';
import * as fromAuth from '../auth/authstate/auth.reducer';
export interface AppState {
    ui: fromUi.UIState;
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
};
/// this is from UI State
export const getUiState = createFeatureSelector<fromUi.UIState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);


/// this is for Auth State
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
