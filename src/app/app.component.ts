import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestingRestulServicesPage } from "../pages/testing-restul-services/testing-restul-services";
import { TestingStorageServicePage } from "../pages/testing-storage-service/testing-storage-service";

import { HomePage } from '../pages/home/home';
import {TestCameraPage} from "../pages/test-camera/test-camera";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TestCameraPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

