import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[AUTH] Set Authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] Set UnAuthenticated';



export class SetAuthenticated implements Action {
    readonly type  = SET_AUTHENTICATED;
}
export class SetUnAuthenticated implements Action {
    readonly type  = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnAuthenticated;
