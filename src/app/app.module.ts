import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestingStorageServicePage } from "../pages/testing-storage-service/testing-storage-service";

import {TestingRestulServicesPage} from "../pages/testing-restul-services/testing-restul-services";

import { TabsPage } from "../pages/tabs/tabs";
import { ProfilePage } from "../pages/profile/profile";
import { RegisterUserPage } from "../pages/register-user/register-user";
import { ViewCarPage } from "../pages/view-car/view-car";
import { ViewTripsPage } from "../pages/view-trips/view-trips";
import { SearchTripPage } from "../pages/search-trip/search-trip";
import { CreateTripPage } from "../pages/create-trip/create-trip";


import { UserRestfulServiceProvider } from '../providers/user-restful-service/user-restful-service';
import { BuildHeadersServiceProvider } from '../providers/build-headers-service/build-headers-service';
import { ReadHeadersServiceProvider } from '../providers/read-headers-service/read-headers-service';
import { CarResfulServiceProvider } from '../providers/car-resful-service/car-resful-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

import { MenuServiceProvider } from '../providers/menu-service/menu-service';

import { TripRestfulServiceProvider } from '../providers/trip-restful-service/trip-restful-service';
import { CityRestulServiceProvider } from '../providers/city-restul-service/city-restul-service';
import { PassengerRestfulServiceProvider } from '../providers/passenger-restful-service/passenger-restful-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestingRestulServicesPage,
    TestingStorageServicePage,
    TabsPage,
    ProfilePage,
    RegisterUserPage,
    ViewTripsPage,
    ViewCarPage,
    SearchTripPage,
    CreateTripPage
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
    TestingStorageServicePage,
    TabsPage,
    ProfilePage,
    RegisterUserPage,
    ViewTripsPage,
    ViewCarPage,
    SearchTripPage,
    CreateTripPage
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
    MenuServiceProvider,
    TripRestfulServiceProvider,
    CityRestulServiceProvider,
    PassengerRestfulServiceProvider
  ]
})
export class AppModule {}
