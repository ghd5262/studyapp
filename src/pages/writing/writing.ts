import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeProvider } from '../../providers/notice/notice';
import { NetworkProvider } from '../../providers/network/network';

/**
 * Generated class for the WritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-writing',
  templateUrl: 'writing.html',
})
export class WritingPage {

  private writing: any;
  private crewData: any;
  private userData: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider,
    private noticeProvider: NoticeProvider) {
    this.crewData = navParams.data.crewData;
    this.userData = networkProvider.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritingPage');
  }

  complete() {

    // this.writing = this.writing.replace(/&#10;/gi, "\n\r");

    // this.writing = this.writing.replace(/(?:\r\n|\r|\n)/g, '');
    // this.writing = this.writing;
    

    this.networkProvider.writing(
      this.crewData.userid,
      this.crewData.id,
      this.userData.username,
      this.userData.useremail,
      this.writing,
      0,
      this.crewData.name).then((data: any) => {
        // this.navCtrl.pop();
        this.noticeProvider.floatingNotice("게시되었습니다.");
      }, (err) => { })

    console.log(this.writing);
  }
}
