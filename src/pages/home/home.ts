import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { CrewRagistrationPage } from '../crew-ragistration/crew-ragistration';
import { HttpClient } from '@angular/common/http';
import { NetworkProvider } from '../../providers/network/network';
import { CrewDetailPage } from '../crew-detail/crew-detail';
import { CrewSearchPage } from '../crew-search/crew-search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public crewList;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    private networkProvider: NetworkProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('HomePage Loaded');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.networkProvider.crewList().then((data:any)=>{
      this.crewList = data;
    }, (err) => { })
  }

  search() {
    this.navCtrl.push(CrewSearchPage);
  }

  registration() {
    // let modal = this.modalCtrl.create(CrewRagistrationPage);
    // modal.present();

    // modal.onWillDismiss((data: any[]) => {});
    this.navCtrl.push(CrewRagistrationPage);
  }

  openCrewDetail(item : any) {
    this.networkProvider.crewDataByIndex(item.id).then((crewData:any)=>{
        this.navCtrl.push(CrewDetailPage, {crewData: crewData});
    },(err)=>{})
  }
}
