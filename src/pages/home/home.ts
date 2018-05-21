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

  public items: Array<any> = [];
  public grid: Array<Array<any>>; //array of arrays

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    private networkProvider: NetworkProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    // this.load();
    console.log('HomePage Loaded');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.networkProvider.crewList().then((data:any)=>{
      this.items = data;
    }, (err) => { })
  }

  ionViewUpate() {
    this.grid = Array(Math.ceil(this.items.length / 2)); //MATHS!


    let rowNum = 0; //counter to iterate over the rows in the grid

    for (let i = 0; i < this.items.length; i += 2) { //iterate images

      this.grid[rowNum] = Array(2); //declare two elements per row

      if (this.items[i]) { //check file URI exists
        this.grid[rowNum][0] = this.items[i] //insert image
      }

      if (this.items[i + 1]) { //repeat for the second image
        this.grid[rowNum][1] = this.items[i + 1]
      }

      rowNum++; //go on to the next row
    }
  }

  search() {
    this.navCtrl.push(CrewSearchPage);
  }

  registration() {
    let modal = this.modalCtrl.create(CrewRagistrationPage);
    modal.present();

    // modal.onWillDismiss((data: any[]) => {});
  }

  openCrewDetail(item : any) {
    this.networkProvider.crewDataByIndex(item.id).then((crewData:any)=>{
        this.navCtrl.push(CrewDetailPage, {crewData: crewData});
    },(err)=>{})
  }
}
