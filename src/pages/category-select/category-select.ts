import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { CrewRagistrationPage } from '../crew-ragistration/crew-ragistration';

/**
 * Generated class for the CategorySelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-select',
  templateUrl: 'category-select.html',
})
export class CategorySelectPage {
  crewCategoryList : any[];
  initial : boolean;
  tabBarElement;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private networkProvider: NetworkProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorySelectPage');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.networkProvider.crewCategoryList().then((categoryList: any) => {
      this.crewCategoryList = categoryList;
      this.initial = true;
    }, (err: any) => { });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex'; 
  }

  getIndex(colSize, i, j) {
    return (i * colSize) + j;
  }

  getCrewByIndex(index) {
    return this.crewCategoryList[index];
  }

  createCrew(index) {
    console.log('category index : ' + index);
    this.navCtrl.push(CrewRagistrationPage, { index: index });
  }
}
