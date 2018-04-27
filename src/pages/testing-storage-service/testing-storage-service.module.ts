import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestingStorageServicePage } from './testing-storage-service';

@NgModule({
  declarations: [
    TestingStorageServicePage,
  ],
  imports: [
    IonicPageModule.forChild(TestingStorageServicePage),
  ],
})
export class TestingStorageServicePageModule {}
