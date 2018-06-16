import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { NetworkProvider } from '../../providers/network/network';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  colors: string[] = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8'];
  crewData;
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  schedule = {
    title: '',
    startTime: '', 
    endTime: '',
    allDay: 0,
    color: 0,
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private networkProvider: NetworkProvider,
    private ga: GoogleAnalytics) {

    this.crewData = navParams.data.crewData;
  }

  addEvent() {

    let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        this.networkProvider.crewScheduleAdd(this.crewData.id, data);

        this.scheduleUpdate(data);
      }
    });

    this.ga.trackEvent('calendar', 'addEvent');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');

    this.networkProvider.scheduleList(this.crewData.id).then((dataList: any) => {

      console.log('dataList : ');
      console.log(dataList);

      for(let data of dataList)
      {
        this.schedule.title = data.title;
        this.schedule.startTime = data.starttime;
        this.schedule.endTime = data.endtime;
        this.schedule.allDay = data.allday;
        this.schedule.color = data.color;

        console.log('schedule: ');
        console.log(this.schedule);

        this.scheduleUpdate(this.schedule);
      }

    
    }, (err: any) => { });

  }

  scheduleUpdate(data) {
    let eventData = data;

    // eventData.title = '';
    eventData.title = data.title;
    eventData.startTime = new Date(data.startTime);
    eventData.endTime = new Date(data.endTime);
    eventData.allDay = data.allDay;
    eventData.color = data.color;

    let events = this.eventSource;
    console.log(data);

    events.push({
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      allDay: data.allDay,
      color: this.colors[data.color]
      // color: colors[Math.floor(Math.random() * colors.length)]
    })
    // this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
      this.moveCurrentMonth(0);
    });

    console.log(`event lenght : ${events.length}` )
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log(event);

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  moveCurrentMonth(count) {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + count));
  }

  prevMonth() {
    this.moveCurrentMonth(-1);
  }

  nextMonth() {
    this.moveCurrentMonth(+1);
  }
}
