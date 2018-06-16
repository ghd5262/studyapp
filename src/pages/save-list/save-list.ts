import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { NetworkProvider } from '../../providers/network/network';
import { PostDetailPage } from '../post-detail/post-detail';
import { ActionModalProvider } from '../../providers/action-modal/action-modal';

/**
 * Generated class for the SaveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-list',
  templateUrl: 'save-list.html',
})
export class SaveListPage {

  userid;
  postArray;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private networkProvider: NetworkProvider,
    private actionModal: ActionModalProvider,
    private ga: GoogleAnalytics) {
  }

  ionViewWillEnter() {
    console.log('post page reloaded');
    this.getSavedPostList();
    this.userid = this.networkProvider.userData.userid;
    this.ga.trackView('post');
  }

  postDetail(postData) {
    this.ga.trackEvent('post', 'postDetail');
    this.networkProvider.crewDataByIndex(postData.crewid).then((crewData:any)=>{
      this.navCtrl.push(PostDetailPage, { crewData: crewData, postData: postData });
    },(err)=>{})
  }

  getSavedPostList() {
    this.networkProvider.savedPostList().then((postArray: any) => {
      this.postArray = postArray;
    }, (err) => { })
  }
  
  modifyPost(postData) {
    this.ga.trackEvent('post', 'postModify');
    this.actionModal.floatingModal(postData.userid, postData.id, () => {}, () => {
      this.networkProvider.deletePost(postData.id).then((data:any)=>{
        this.getSavedPostList();
      }, (err:any)=>{});
    }, ()=>{
      this.networkProvider.savedPostCancel(postData.id).then((data:any)=>{
        this.getSavedPostList();
      }, (err:any)=>{});
    });
  }
}
