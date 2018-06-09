import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrewCategoryDetailPage } from './crew-category-detail';

@NgModule({
  declarations: [
    CrewCategoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CrewCategoryDetailPage),
  ],
})
export class CrewCategoryDetailPageModule {}
