import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrewDetailPage } from './crew-detail';

@NgModule({
  declarations: [
    CrewDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CrewDetailPage),
  ],
})
export class CrewDetailPageModule {}
