import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseFloor } from './choose-floor';

@NgModule({
  declarations: [
    ChooseFloor,
  ],
  imports: [
    IonicPageModule.forChild(ChooseFloor),
  ],
  exports: [
    ChooseFloor
  ]
})
export class ChooseFloorModule {}
