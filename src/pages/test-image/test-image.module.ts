import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestImagePage } from './test-image';

@NgModule({
  declarations: [
    TestImagePage,
  ],
  imports: [
    IonicPageModule.forChild(TestImagePage),
  ],
})
export class TestImagePageModule {}
