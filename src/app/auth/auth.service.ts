import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import * as fromRoot from '../appstate/app.reducer';
import * as UiAllActions from '../shared/uistate/ui.actions';
import * as authAllActions from '../auth/authstate/auth.actions';
import { Store } from '@ngrx/store';
import { UIService } from '../shared/ui.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private store: Store<fromRoot.AppState>,
    private uiService: UIService,
    private afuth: AngularFireAuth,
    private trainingService: TrainingService) { }

  initAuthListener() {
    this.afuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new authAllActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelTrainingSubscriptions();
        this.store.dispatch(new authAllActions.SetUnAuthenticated());
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData) {
    this.store.dispatch(new UiAllActions.StartLoading());
    this.afuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((result) => {
      this.store.dispatch(new UiAllActions.StopLoading());
    }).catch(err => {
      this.store.dispatch(new UiAllActions.StopLoading());
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UiAllActions.StartLoading());
    this.afuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((result) => {
      this.store.dispatch(new UiAllActions.StopLoading());
    }).catch(err => {
      this.store.dispatch(new UiAllActions.StopLoading());
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  logout() {
    this.afuth.auth.signOut();
  }
}
