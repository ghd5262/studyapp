import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
import { NetworkProvider } from '../../providers/network/network';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signupAccount: any = {
    name: '',
    email: '',
    password: '',
    thumbnail: ''
  }
  constructor(public navCtrl: NavController, 
    private networkProvider: NetworkProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.signupAccount.email, this.signupAccount.password)
      .then((result) => {
        console.log(result);

        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: this.signupAccount.name,
          photoURL: ""
        }).then(() => {
          console.log("login success");

          this.networkProvider.signup(this.signupAccount.name, 
              this.signupAccount.email, 
              this.signupAccount.password);

        }).catch((error) => {
          console.log(error.message);
        });

      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err code : " + errorCode + "err msg : " + errorMessage);
      });
  }

}
