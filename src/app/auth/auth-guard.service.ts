import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../appstate/app.reducer';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private store: Store<fromRoot.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}
