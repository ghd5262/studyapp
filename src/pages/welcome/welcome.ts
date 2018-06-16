import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { LoginOptionPage } from '../login-option/login-option';
import { LoginProvider } from '../../providers/login/login';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, 
    private loginProvider: LoginProvider,
    public navParams: NavParams,
    private ga: GoogleAnalytics) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  loginWithFacebook() {
    this.loginProvider.facebook();
  }

  signup() {
    this.ga.trackEvent('welcome', 'signup');
    this.navCtrl.push(SignupPage);
  }

  loginOptions() {
    this.ga.trackEvent('welcome', 'loginOptions');
    this.navCtrl.push(LoginOptionPage);
  }

  login() {
    this.ga.trackEvent('welcome', 'login');
    this.navCtrl.push(LoginPage);
  }
}
