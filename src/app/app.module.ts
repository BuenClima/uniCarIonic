import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestingStorageServicePage } from "../pages/testing-storage-service/testing-storage-service";
import { TestingRestulServicesPage } from "../pages/testing-restul-services/testing-restul-services";

import { UserRestfulServiceProvider } from '../providers/user-restful-service/user-restful-service';
import { BuildHeadersServiceProvider } from '../providers/build-headers-service/build-headers-service';
import { ReadHeadersServiceProvider } from '../providers/read-headers-service/read-headers-service';
import { CarResfulServiceProvider } from '../providers/car-resful-service/car-resful-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { TripRestfulServiceProvider } from '../providers/trip-restful-service/trip-restful-service';
import { CityRestulServiceProvider } from '../providers/city-restul-service/city-restul-service';
import { PassengerRestfulServiceProvider } from '../providers/passenger-restful-service/passenger-restful-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestingRestulServicesPage,
    TestingStorageServicePage
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
    TestingRestulServicesPage,
    TestingStorageServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserRestfulServiceProvider,
    BuildHeadersServiceProvider,
    ReadHeadersServiceProvider,
    CarResfulServiceProvider,
    StorageServiceProvider,
    TripRestfulServiceProvider,
    CityRestulServiceProvider,
    PassengerRestfulServiceProvider
  ]
})
export class AppModule {}
