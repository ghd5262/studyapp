import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorPickModalPage } from './color-pick-modal';

@NgModule({
  declarations: [
    ColorPickModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorPickModalPage),
  ],
})
export class ColorPickModalPageModule {}
