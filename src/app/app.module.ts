import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestfullProvider } from '../providers/restfull/restfull';
import { HttpClientModule } from "@angular/common/http";
import { TestingRestfullPage } from "../pages/testing-restfull/testing-restfull";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestingRestfullPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestingRestfullPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestfullProvider
  ]
})
export class AppModule {}
