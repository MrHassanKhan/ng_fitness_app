import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../appstate/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
      private store: Store<fromRoot.AppState>
    //  private uiService: UIService
     ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(isloading => {
    //   this.isLoading = isloading;
    // });
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
