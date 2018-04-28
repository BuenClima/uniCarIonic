import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestCameraPage } from './test-camera';

@NgModule({
  declarations: [
    TestCameraPage,
  ],
  imports: [
    IonicPageModule.forChild(TestCameraPage),
  ],
})
export class TestCameraPageModule {}
