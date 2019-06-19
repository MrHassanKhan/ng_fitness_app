import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SignupComponent,
        LoginComponent
    ]
})
export class AuthModule { }
