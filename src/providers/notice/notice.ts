import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
@Injectable()
export class NoticeProvider {

  private loading: any;
  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

  }

  loadingProgressOn() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  loadingProgressOff() {
    this.loading.dismiss();
  }

  floatingNotice(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
