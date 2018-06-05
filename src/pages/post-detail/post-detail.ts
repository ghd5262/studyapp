import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';

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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider) {
    this.crewData = navParams.data.crewData;
    this.postData = navParams.data.postData;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    console.log(this.postData.content);
    console.log(this.crewData.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
    this.networkProvider.commentListByPost(this.postData.id).then((commentList: any) => {
      this.commentList = commentList;
      this.commentCount = commentList.length;
    }, (err: any) => { });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  complete() {
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
