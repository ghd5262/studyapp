import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { ActionModalProvider } from '../../providers/action-modal/action-modal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  private crewData;
  private postData;
  private tabBarElement;
  private writing;
  private commentList;
  private commentCount;
  private userid;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider,
    private actionModal: ActionModalProvider,
    private ga: GoogleAnalytics) {
    this.crewData = navParams.data.crewData;
    this.postData = navParams.data.postData;
    this.userid = this.networkProvider.userData.userid;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    console.log(this.postData.content);
    console.log(this.crewData.name);
  }

  ionViewDidLoad() {
    this.ga.trackView('post/detail');
    console.log('ionViewDidLoad PostDetailPage');
    this.getCommentList();
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  getCommentList() {
    this.networkProvider.commentListByPost(this.postData.id).then((commentList: any) => {
      this.commentList = commentList;
      this.commentCount = commentList.length;
    }, (err: any) => { });
  }

  modifyPost(postData) {
    this.ga.trackEvent('postDetail', 'postModify');
    this.actionModal.floatingModal(postData.userid, postData.id, () => {}, ()=>{
      this.networkProvider.deletePost(postData.id).then((data:any)=>{
        this.navCtrl.pop();
      }, (err:any)=>{});
    });
  }

  modifyComment(commentData) {
    this.ga.trackEvent('postDetail', 'commentModify');
    this.actionModal.floatingModal(commentData.userid, -1, () => {}, ()=>{
      this.networkProvider.deleteComment(commentData.id).then((data:any)=>{
        this.getCommentList();
      }, (err:any)=>{});
    });
  }

  complete() {
    this.ga.trackEvent('postDetail', 'writeComment'); 
    console.log(this.writing);
    this.networkProvider.writeComment(this.crewData.id, this.postData.id, this.writing).then((applyList: any) => {
      this.networkProvider.commentListByPost(this.postData.id).then((commentList: any) => {
        this.commentList = commentList;
        this.commentCount = commentList.length;
      }, (err: any) => { });
    }, (err: any) => { });
    this.writing = '';
  }
}
