import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  private tabBarElement;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider,
    private noticeProvider: NoticeProvider,
    private alertCtrl: AlertController) {
    this.crewData = navParams.data.crewData;
    this.userData = networkProvider.userData;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritingPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  complete() {

    // this.writing = this.writing.replace(/&#10;/gi, "\n\r");

    // this.writing = this.writing.replace(/(?:\r\n|\r|\n)/g, '');
    // this.writing = this.writing;


    this.networkProvider.writing(
      this.userData.userid,
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

  alert() { 
    let alert = this.alertCtrl.create({
      title: 'Native',
      subTitle: 'Run in a device',
      buttons: ['Confirm']
    });
    alert.present();
  }
}
