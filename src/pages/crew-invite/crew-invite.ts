import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';

/**
 * Generated class for the CrewInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crew-invite',
  templateUrl: 'crew-invite.html',
})
export class CrewInvitePage {

  private crewData: any;
  private applyList: any;
  private tabBarElement;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider) {

    this.crewData = navParams.data.crewData;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrewInvitePage');
    this.networkProvider.crewApplyList(this.crewData.id).then((applyList: any) => {
      this.applyList = applyList;
    }, (err: any) => { });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  accept(user: any) {
    this.networkProvider.crewJoin(user.userid, this.crewData.id, true);
  }

  refuse(user: any) {
    this.networkProvider.crewJoin(user.userid, this.crewData.id, false);
  }
}
