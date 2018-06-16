import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { LoginProvider } from '../../providers/login/login';

import * as firebase from 'firebase';
import { NoticeProvider } from '../../providers/notice/notice';
import { TabPage } from '../tab/tab';
import { NetworkProvider } from '../../providers/network/network';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginAccount: any = {
    email: '',
    password: ''
  }
  constructor(public navCtrl: NavController,
    private noticeProvider: NoticeProvider,
    private loginProvider: LoginProvider,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider,
    private ga: GoogleAnalytics) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.ga.trackView('login');
  }

  login() {

    this.noticeProvider.loadingProgressOn();
    this.loginProvider.myApp(this.loginAccount.email, this.loginAccount.password).then((res: any) => {
      if (res.result = 'success') {

        this.networkProvider.userDataByEmail(this.loginAccount.email).then(() => {
          this.navCtrl.setRoot(TabPage);
        }, () => { });

        console.log('login success');
      } else {
        this.noticeProvider.floatingNotice("로그인 실패!");
      }
    }, (err) => {
      console.log('login failed');
      this.noticeProvider.floatingNotice("아이디와 비밀번호를 다시 확인해주세요.");
    });;
    this.noticeProvider.loadingProgressOff();
  }

  signup() {
    this.navCtrl.push(SignupPage);
    this.ga.trackEvent('login', 'signup');
  }

  resetEmail() {

    this.ga.trackEvent('login', 'resetEmail');

    let alert = this.alertCtrl.create({
      title: '비밀번호 초기화',
      message: "계정을 찾으려면 이메일 주소를 입력하세요.",
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            var auth = firebase.auth();
            var emailAddress = data.email;

            auth.sendPasswordResetEmail(emailAddress).then(() => {
              let alert = this.alertCtrl.create({
                title: 'Password reset',
                subTitle: 'Send email',
                buttons: ['Confirm']
              });
              alert.present();
            }).catch((error) => {

            });
          }
        }
      ]
    });
    alert.present();


  }
}
