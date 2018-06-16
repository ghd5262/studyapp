import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { HomePage } from '../home/home';
import { TabPage } from '../tab/tab';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the CrewRagistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crew-ragistration',
  templateUrl: 'crew-ragistration.html',
})
export class CrewRagistrationPage {

  private crew: any = {
    name: '',
    description: '',
    img: ''
  }
  categoryIndex;
  private tabBarElement;
  crewCategoryList;
  constructor(public navCtrl: NavController,
    private networkProvider: NetworkProvider,
    private alertController: AlertController,
    public navParams: NavParams,
    private ga: GoogleAnalytics) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.categoryIndex = navParams.data.index;
      this.networkProvider.crewCategoryList().then((categoryList: any) => {
        this.crewCategoryList = categoryList;
      }, (err: any) => { });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrewRagistrationPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  registration() {

    console.log("name : " + this.crew.name);
    console.log("description : " + this.crew.description);
    let categoryName = this.crewCategoryList[this.categoryIndex].cname;
    this.ga.trackEvent('studyCreate', 'create', categoryName);

    // let body = {name: this.crew.name, description: this.crew.description};
    this.crew.img = "assets/imgs/study_" + (Math.floor(Math.random() * (11 - 1 + 1)) + 1) + ".jpg";
    // this.crew.img = "assets/imgs/board.jpg";
    let userid = this.networkProvider.userData.userid;
    this.networkProvider.crewAdd(userid, this.crew.name, this.crew.description, this.crew.img, this.categoryIndex).then((res: any) => {
      this.navCtrl.setRoot(TabPage);
    });
  }

  back() {
    this.navCtrl.pop();
  }
}
