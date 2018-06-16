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

  floatingModal(userid, postid, modify, remove, savedCancel = null) {
    this.userid = this.networkProvider.userData.userid;

    console.log(userid);
    console.log(this.userid);

    let saveButton: any = {
      text: '저장',
      icon: !this.platform.is('ios') ? 'heart' : null,
      handler: () => {
        this.networkProvider.savePost(postid);
      }
    };
    let saveCancelButton: any = {
      text: '저장취소',
      icon: !this.platform.is('ios') ? 'heart-outline' : null,
      handler: () => {
        savedCancel();
      }
    };
    let modifyButton: any = {
      text: '수정',
      icon: !this.platform.is('ios') ? 'create' : null,
      handler: () => {
        modify();
      }
    }
    let reportButton: any = {
      text: '신고',
      icon: !this.platform.is('ios') ? 'warning' : null,
      handler: () => {

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

    let buttons1: any[] = [(!savedCancel) ? saveButton : saveCancelButton, modifyButton, removeButton, cancelButton];
    let buttons2: any[] = [(!savedCancel) ? saveButton : saveCancelButton, reportButton, cancelButton];
    let buttons3: any[] = [modifyButton, removeButton, cancelButton];
    let buttons4: any[] = [reportButton, cancelButton];
    let buttons5;
    if(this.userid == userid){
      if(postid > -1){
        buttons5 = buttons1;
      }
      else{
        buttons5 = buttons3;
      }
    }
    else{
      if(postid > -1){
        buttons5 = buttons2;
      }
      else{
        buttons5 = buttons4;
      }
    }

    const actionSheet = this.actionSheetCtrl.create({buttons: buttons5});
    actionSheet.present();

  }
}
