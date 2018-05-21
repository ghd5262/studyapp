import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrewSearchPage } from './crew-search';

@NgModule({
  declarations: [
    CrewSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CrewSearchPage),
  ],
})
export class CrewSearchPageModule {}
