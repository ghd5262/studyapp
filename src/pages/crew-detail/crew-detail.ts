import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { WritingPage } from '../writing/writing';
import { NetworkProvider } from '../../providers/network/network';
import { PostDetailPage } from '../post-detail/post-detail';
import { CrewInvitePage } from '../crew-invite/crew-invite';
import { CalendarPage } from '../calendar/calendar';
import { ActionModalProvider } from '../../providers/action-modal/action-modal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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
  private userid;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private networkProvider: NetworkProvider,
    private actionSheetCtrl: ActionSheetController,
    private actionModal: ActionModalProvider,
    private ga: GoogleAnalytics) {

    this.crewData = navParams.data.crewData;
    this.userid = networkProvider.userData.userid;
    console.log(this.crewData.id + ' crew loaded');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }
  
  ionViewDidLoad() {

    this.networkProvider.isCrewMember(this.crewData.id).then((isCrewMember:any)=>{
      this.isCrewMember = isCrewMember;
    }, (err:any)=>{});

    this.networkProvider.isCrewLeader(this.crewData.id).then((isCrewLeader:any)=>{
      this.isCrewLeader = isCrewLeader;
    }, (err:any)=>{});

    this.networkProvider.crewMemberCount(this.crewData.id).then((count:any)=>{
      this.crewMemberCount = count;
    }, (err:any)=>{});

    this.getPostList();
   
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CrewDetailPage');
    this.tabBarElement.style.display = 'none';

    this.getPostList();
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  getPostList() {
    this.networkProvider.postListInCrew(this.crewData.id).then((postArray:any)=>{
      this.postArray = postArray;
    }, (err:any)=>{});
  }

  addMember() {
    this.ga.trackEvent('studyDetail', 'addMember');
    this.navCtrl.push(CrewInvitePage, {crewData: this.crewData});
  }

  writing() {
    // let modal = this.modalCtrl.create(WritingPage, { crewData: this.crewData });
    // modal.present();
    this.ga.trackEvent('studyDetail', 'writing');
    this.navCtrl.push(WritingPage, { crewData: this.crewData });
  }

  apply() {
    this.ga.trackEvent('studyDetail', 'apply', this.crewData.cname);
    this.networkProvider.crewApply(this.crewData);
  }

  postDetail(postData) {
    this.ga.trackEvent('studyDetail', 'postDetail');
    this.navCtrl.push(PostDetailPage, { crewData: this.crewData, postData: postData });
  }

  calendar() {
    this.ga.trackEvent('studyDetail', 'calendar');
    this.navCtrl.push(CalendarPage, {crewData: this.crewData});
  }

  modifyPost(postData) {
    this.ga.trackEvent('studyDetail', 'modifyPost');
    this.actionModal.floatingModal(postData.userid, postData.id, () => {}, ()=>{
      this.networkProvider.deletePost(postData.id).then((data:any)=>{
        this.getPostList();
      }, (err:any)=>{});
    });
  }
}
