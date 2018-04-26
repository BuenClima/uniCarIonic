import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestingRestulServicesPage } from './testing-restul-services';

@NgModule({
  declarations: [
    TestingRestulServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(TestingRestulServicesPage),
  ],
})
export class TestingRestulServicesPageModule {}
