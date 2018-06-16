import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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
    public navParams: NavParams,
    private ga: GoogleAnalytics) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginOptionPage');
    this.ga.trackView('login/loginOption');
  }

  facebookLogin() {
    this.loginProvider.facebook();
    this.ga.trackEvent('loginOption', 'facebook');
  }

  googleLogin() {
    this.loginProvider.google();
    this.ga.trackEvent('loginOption', 'google');
  }

}
