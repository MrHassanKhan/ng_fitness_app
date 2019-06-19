import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../appstate/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
   this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
