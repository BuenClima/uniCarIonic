import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserRestfulServiceProvider } from '../providers/user-restful-service/user-restful-service';
import { BuildHeadersServiceProvider } from '../providers/build-headers-service/build-headers-service';
import { ReadHeadersServiceProvider } from '../providers/read-headers-service/read-headers-service';
import {TestingRestulServicesPage} from "../pages/testing-restul-services/testing-restul-services";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestingRestulServicesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestingRestulServicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserRestfulServiceProvider,
    BuildHeadersServiceProvider,
    ReadHeadersServiceProvider
  ]
})
export class AppModule {}
