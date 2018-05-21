import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class LoginProvider {

  constructor() {
    console.log('Hello LoginProvider Provider');
  }

  private provider = new firebase.auth.FacebookAuthProvider();

  facebook() {
    firebase.auth().signInWithRedirect(this.provider);

    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log("error Msg" + errorMessage);
    });
  }

  google() {

  }

  myApp(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result.message);
          resolve(result);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          reject(error);
        });
    });
  }
}
