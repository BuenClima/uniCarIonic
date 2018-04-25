import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestingRestfullPage } from './testing-restfull';

@NgModule({
  declarations: [
    TestingRestfullPage,
  ],
  imports: [
    IonicPageModule.forChild(TestingRestfullPage),
  ],
})
export class TestingRestfullPageModule {}
