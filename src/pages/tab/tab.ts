import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { SaveListPage } from '../save-list/save-list';
import { MessagePage } from '../message/message';
import { CrewRagistrationPage } from '../crew-ragistration/crew-ragistration';
import { PostPage } from '../post/post';

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

  tab1Root: any = HomePage;
  tab2Root: any = PostPage;
  tab3Root: any = SaveListPage;
  tab4Root: any = MessagePage;
  tab5Root: any = CrewRagistrationPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

}