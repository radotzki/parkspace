import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorThree } from './floor-three';

@NgModule({
  declarations: [
    FloorThree,
  ],
  imports: [
    IonicPageModule.forChild(FloorThree),
  ],
  exports: [
    FloorThree
  ]
})
export class FloorThreeModule {}
