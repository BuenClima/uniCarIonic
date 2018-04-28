import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuServiceProvider } from "../providers/menu-service/menu-service";

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('menu') navCtrl: Nav;

  rootPage:any = HomePage;

  public pages: Array<{title: string, component: any, icon: String}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuService: MenuServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.menuService.getPages()
      .subscribe(res => {
        this.pages = res;
        console.log('Pages', this.pages);
      })

  }

  goToPage(page){
    this.navCtrl.setRoot(page);
  }
}

