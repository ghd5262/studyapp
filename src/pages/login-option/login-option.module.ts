import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOptionPage } from './login-option';

@NgModule({
  declarations: [
    LoginOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOptionPage),
  ],
})
export class LoginOptionPageModule {}
