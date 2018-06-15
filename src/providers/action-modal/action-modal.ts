import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, Platform, ActionSheet } from 'ionic-angular';
import { NetworkProvider } from '../network/network';

/*
  Generated class for the ActionModalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActionModalProvider {

  userid;
  constructor(public http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private networkProvider: NetworkProvider,
    public platform: Platform) {
    console.log('Hello ActionModalProvider Provider');
  }

  floatingModal(userid, save, modify, remove) {
    this.userid = this.networkProvider.userData.userid;

    console.log(userid);
    console.log(this.userid);

    let saveButton: any = {
      text: '저장',
      icon: !this.platform.is('ios') ? 'heart-outline' : null,
      handler: () => {
        save();
      }
    };
    let modifyButton: any = {
      text: '수정',
      icon: !this.platform.is('ios') ? 'create' : null,
      handler: () => {
        modify();
      }
    }
    let removeButton: any = {
      text: '삭제',
      icon: !this.platform.is('ios') ? 'trash' : null,
      handler: () => {
        remove();
      }
    }
    let cancelButton: any = {
      text: '취소',
      role: 'cancel',
      icon: !this.platform.is('ios') ? 'close' : null,

      handler: () => {
      }
    }

    let buttons1: any[] = [saveButton, modifyButton, removeButton, cancelButton];
    let buttons2: any[] = [saveButton, cancelButton];
    // let buttons3 = !this.userid == userid ? buttons1 : buttons2;

    const actionSheet = this.actionSheetCtrl.create({
      buttons: (this.userid == userid) ? buttons1 : buttons2
      // buttons: [
      //   {
      //     text: '저장',
      //     icon: !this.platform.is('ios') ? 'heart-outline' : null,
      //     handler: () => {
      //       save();
      //     }
      //   }, {
      //     text: (!this.userid == userid) ? '수정' : null,
      //     icon: !this.platform.is('ios') ? 'create' : null,
      //     handler: () => {
      //       modify();
      //     }
      //   }, {
      //     text: (!this.userid == userid) ? '삭제' : null,
      //     icon: !this.platform.is('ios') ? 'trash' : null,
      //     handler: () => {
      //       remove();
      //     }
      //   }, {
      //     text: '취소',
      //     role: 'cancel',
      //     icon: !this.platform.is('ios') ? 'close' : null,

      //     handler: () => {
      //     }
      //   }
      // ]
    });
    actionSheet.present();

  }
}
