import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { CrewRagistrationPage } from '../crew-ragistration/crew-ragistration';
import { HttpClient } from '@angular/common/http';
import { NetworkProvider } from '../../providers/network/network';
import { CrewDetailPage } from '../crew-detail/crew-detail';
import { CrewSearchPage } from '../crew-search/crew-search';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { EventModalPage } from '../event-modal/event-modal';
import { CalendarPage } from '../calendar/calendar';

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

 
  private myphoto;
  ionViewDidLoad() {
    console.log('HomePage Loaded');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.networkProvider.crewList().then((data: any) => {
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

  openCrewDetail(item: any) {
    this.networkProvider.crewDataByIndex(item.id).then((crewData: any) => {
      this.navCtrl.push(CrewDetailPage, { crewData: crewData });
    }, (err) => { })
  }

  // takePhoto() {
  
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.myphoto = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  // getImage() {
  
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum:false
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.myphoto = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }
}
