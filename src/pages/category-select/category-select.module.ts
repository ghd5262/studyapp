import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategorySelectPage } from './category-select';

@NgModule({
  declarations: [
    CategorySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CategorySelectPage),
  ],
})
export class CategorySelectPageModule {}
