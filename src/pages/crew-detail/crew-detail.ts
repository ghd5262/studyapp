import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WritingPage } from '../writing/writing';
import { NetworkProvider } from '../../providers/network/network';
import { PostDetailPage } from '../post-detail/post-detail';
import { CrewInvitePage } from '../crew-invite/crew-invite';

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

  private isCrewMember: any;
  private isCrewLeader: any;
  private crewData: any;
  private crewMemberCount: any;
  private postArray = [];
  private tabBarElement;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private networkProvider: NetworkProvider) {

    this.crewData = navParams.data.crewData;

    console.log(this.crewData.id + ' crew loaded');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }
  
  ionViewDidLoad() {
    this.networkProvider.postListInCrew(this.crewData.id).then((postArray:any)=>{
      this.postArray = postArray;
    }, (err:any)=>{});

    this.networkProvider.isCrewMember(this.crewData.id).then((isCrewMember:any)=>{
      this.isCrewMember = isCrewMember;
    }, (err:any)=>{});

    this.networkProvider.isCrewLeader(this.crewData.id).then((isCrewLeader:any)=>{
      this.isCrewLeader = isCrewLeader;
    }, (err:any)=>{});

    this.networkProvider.crewMemberCount(this.crewData.id).then((count:any)=>{
      this.crewMemberCount = count;
    }, (err:any)=>{});
   
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CrewDetailPage');
    this.tabBarElement.style.display = 'none';

    this.networkProvider.postListInCrew(this.crewData.id).then((postArray:any)=>{
      this.postArray = postArray;
    }, (err:any)=>{});
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  addMember() {
    this.navCtrl.push(CrewInvitePage, {crewData: this.crewData});
  }

  writing() {
    // let modal = this.modalCtrl.create(WritingPage, { crewData: this.crewData });
    // modal.present();
    this.navCtrl.push(WritingPage, { crewData: this.crewData });
  }

  apply() {
    this.networkProvider.crewApply(this.crewData);
  }

  postDetail(postData) {
    this.navCtrl.push(PostDetailPage, { crewData: this.crewData, postData: postData });
  }
}
