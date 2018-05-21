import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { WelcomePage } from '../welcome/welcome';
import { NetworkProvider } from '../../providers/network/network';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {


  private postArray = [];
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private networkProvider: NetworkProvider) {
    console.log('ionViewDidLoad PostPage');
  }

  ionViewWillEnter() {
    console.log('post page reloaded');
    this.networkProvider.postListAll().then((postArray: any) => {
      this.postArray = postArray;
    }, (err) => { })
  }

  logout() {

    let confirm = this.alertCtrl.create({
      title: '로그아웃',
      message: '로그아웃 하시겠습니까?',
      buttons: [
        {
          text: '아니오',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: '네',
          handler: () => {
            console.log('Yes clicked');
            firebase.auth().signOut().then(() => {
              console.log("logout success");
              this.navCtrl.setRoot(WelcomePage);
            }).catch((error) => {
              console.log(error.message);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
