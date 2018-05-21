import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the LoginOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-option',
  templateUrl: 'login-option.html',
})
export class LoginOptionPage {

  constructor(public navCtrl: NavController, 
    private loginProvider: LoginProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginOptionPage');
  }

  facebookLogin() {
    this.loginProvider.facebook();
  }

  googleLogin() {
    this.loginProvider.google();
  }

}
