import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import * as firebase from 'firebase';
import { TabPage } from '../pages/tab/tab';
import { NetworkProvider } from '../providers/network/network';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA6A9JTFHHrvP0dOimReguUA5jNKHzwFDM",
  authDomain: "firstapp-5f767.firebaseapp.com",
  databaseURL: "https://firstapp-5f767.firebaseio.com",
  projectId: "firstapp-5f767",
  storageBucket: "",
  messagingSenderId: "917114402002"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private networkProvider: NetworkProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("HomePage");
        this.networkProvider.userDataByEmail(user.email).then(() => {
            this.rootPage = TabPage;
        }, () => { });

      } else {
        console.log("WelcomePage");
        this.rootPage = WelcomePage;
      }
    });
  }
}

