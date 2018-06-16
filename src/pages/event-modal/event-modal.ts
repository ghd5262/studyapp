import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event = { title: '', startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, color: 0 }
  minDate = new Date().toISOString();
  colors: string[] = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8'];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private ga: GoogleAnalytics) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();

    console.log(preselectedDate);
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

  colorPick() {
    this.ga.trackEvent('scheduleDetail', 'colorPick');
    let modal = this.modalCtrl.create('ColorPickModalPage');
    modal.present();

    modal.onDidDismiss(data => {
      // if (data) {
        this.event.color = data;
      // }
    });
  }
}
