import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTripsPage } from './view-trips';

@NgModule({
  declarations: [
    ViewTripsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTripsPage),
  ],
})
export class ViewTripsPageModule {}
