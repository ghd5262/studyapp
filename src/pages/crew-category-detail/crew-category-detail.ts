import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { AllCrewViewPage } from '../all-crew-view/all-crew-view';

/**
 * Generated class for the CrewCategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crew-category-detail',
  templateUrl: 'crew-category-detail.html',
})
export class CrewCategoryDetailPage {

  private crewCategoryList;
  private tabBarElement;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private networkProvider: NetworkProvider) {

      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.networkProvider.crewCategoryList().then((categoryList: any) => {
      this.crewCategoryList = categoryList;

    }, (err: any) => { });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrewCategoryDetailPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  openCategory(categoryData) {
    this.navCtrl.push(AllCrewViewPage, { title: categoryData.name });
  }
}
