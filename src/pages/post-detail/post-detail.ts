import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.crewData = navParams.data.crewData;
    this.postData = navParams.data.postData;

    console.log(this.postData.content);
    console.log(this.crewData.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
  }

}
