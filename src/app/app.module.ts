import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { reducers} from './appstate/app.reducer';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
