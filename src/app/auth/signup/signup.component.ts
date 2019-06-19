import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../appstate/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  maxDate = new Date();
  isLoading$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 10);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
