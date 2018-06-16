import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { WelcomePage } from '../welcome/welcome';
import { NetworkProvider } from '../../providers/network/network';
import { PostDetailPage } from '../post-detail/post-detail';
import { ActionModalProvider } from '../../providers/action-modal/action-modal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {


  private postArray = [];
  userid;
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private networkProvider: NetworkProvider,
    private actionModal: ActionModalProvider,
    private ga: GoogleAnalytics) {
    console.log('ionViewDidLoad PostPage');
  }

  ionViewWillEnter() {
    console.log('post page reloaded');
    this.getPostListAll();
    this.userid = this.networkProvider.userData.userid;
    this.ga.trackView('post');
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

  postDetail(postData) {
    this.ga.trackEvent('post', 'postDetail');
    this.networkProvider.crewDataByIndex(postData.crewid).then((crewData:any)=>{
      this.navCtrl.push(PostDetailPage, { crewData: crewData, postData: postData });
    },(err)=>{})
  }

  getPostListAll() {
    this.networkProvider.postListAll().then((postArray: any) => {
      this.postArray = postArray;
    }, (err) => { })
  }
  
  modifyPost(postData) {
    this.actionModal.floatingModal(postData.userid, () => {}, () => {}, ()=>{
      this.networkProvider.deletePost(postData.id).then((data:any)=>{
        this.getPostListAll();
      }, (err:any)=>{});
    });
  }
}
