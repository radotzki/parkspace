import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorTwo } from './floor-two';

@NgModule({
  declarations: [
    FloorTwo,
  ],
  imports: [
    IonicPageModule.forChild(FloorTwo),
  ],
  exports: [
    FloorTwo
  ]
})
export class FloorTwoModule {}
