import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AllCrewViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-crew-view',
  templateUrl: 'all-crew-view.html',
})
export class AllCrewViewPage {

  private title;
  private tabBarElement;
  private crewList;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {

      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.title = navParams.data.title;
      this.crewList = navParams.data.crewList;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllCrewViewPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
