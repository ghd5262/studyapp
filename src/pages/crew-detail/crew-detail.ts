import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WritingPage } from '../writing/writing';
import { NetworkProvider } from '../../providers/network/network';
import { PostDetailPage } from '../post-detail/post-detail';

/**
 * Generated class for the CrewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crew-detail',
  templateUrl: 'crew-detail.html',
})
export class CrewDetailPage {

  private crewData: any;
  private postArray = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private networkProvider: NetworkProvider) {

    this.crewData = navParams.data.crewData;

    console.log(this.crewData.id + ' crew loaded');
  }
  
  ionViewDidLoad() {
    this.networkProvider.postListInCrew(this.crewData.id).then((postArray:any)=>{
      this.postArray = postArray;
    }, (err:any)=>{});
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CrewDetailPage');

    this.networkProvider.postListInCrew(this.crewData.id).then((postArray:any)=>{
      this.postArray = postArray;
    }, (err:any)=>{});
  }

  addMember() {

  }

  writing() {
    let modal = this.modalCtrl.create(WritingPage, { crewData: this.crewData });
    modal.present();
    // this.navCtrl.push(WritingPage, { crewData: this.crewData });
  }

  postDetail(postData) {
    this.navCtrl.push(PostDetailPage, { crewData: this.crewData, postData: postData });
  }
}
