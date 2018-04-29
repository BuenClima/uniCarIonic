import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateTripPage} from "../create-trip/create-trip";
import {ViewTripsPage} from "../view-trips/view-trips";
import {ViewCarPage} from "../view-car/view-car";
import {SearchTripPage} from "../search-trip/search-trip";
import {ProfilePage} from "../profile/profile";
import {MenuServiceProvider} from "../../providers/menu-service/menu-service";

@IonicPage()
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html',
})
export class GettingStartedPage {
  @ViewChild('myslides') myslides;
  @ViewChild('slidefloat1') slidefloat1;
  @ViewChild('slidefloat2') slidefloat2;
  @ViewChild('slidefloat3') slidefloat3;
  private rAf: any;
  private bindOnProgress: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuServiceProvider) {
    this.rAf = (function () {
      return (window as any).requestAnimationFrame || (window as any).webkitRequestAnimationFrame
              || (window as any).mozRequestAnimationFrame || function (callback) {
              window.setTimeout(callback, 1000/ 60);
              };
    })();
  }

  onMove() {
    if (!this.bindOnProgress) {
      this.bindOnProgress = true;
      this.myslides.slider.on('onProgress', (swiper, progress) => {
        let firstQuarter = () => {
          let slidefloat1Opacity = -1/0.25 * progress + 1;
          console.log ('slidefloat1Opacity: ' + slidefloat1Opacity);
          this.slidefloat1.nativeElement.style.opacity = slidefloat1Opacity;
          this.slidefloat2.nativeElement.style.opacity = 0;
        }
        let secondQuarter = () => {
          let slidefloat2Opacity = 4 * progress - 1;
          console.log ('slidefloat2Opacity: ' + slidefloat2Opacity);
          this.slidefloat2.nativeElement.style.opacity = slidefloat2Opacity;
          this.slidefloat2.nativeElement.style.transform = 'translateY(0px)';
          this.slidefloat1.nativeElement.style.opacity = 0;
        }
        let thirdQuarter = () => {
          let slidefloat2transform = -1000 * progress + 500;
          console.log('slidefloat2transform: ' + slidefloat2transform);
          this.slidefloat2.nativeElement.style.transform = 'translateY(' + slidefloat2transform + 'px)';
          this.slidefloat3.nativeElement.style.opacity = 0;
        }
        let fourthQuarter = () => {
          let slidefloat3Opacity = 4 * progress - 3;
          console.log ('slidefloat3Opacity: ' + slidefloat3Opacity);
          this.slidefloat3.nativeElement.style.opacity = slidefloat3Opacity;
          this.slidefloat2.nativeElement.style.transform = 'translateY(-250px)';
        }

        if (progress <= 0.25) {
          this.rAf(firstQuarter);
        } else if ((progress > 0.25) && (progress <= 0.5)) {
          this.rAf(secondQuarter);
        } else if ((progress > 0.5) && (progress <= 0.75)) {
          this.rAf(thirdQuarter);
        } else if ((progress > 0.75) && (progress <= 1)) {
          this.rAf(fourthQuarter);
        }

        });
    }
  }

  Start() {
    let pages = [
      { title: 'Mi perfil', component: ProfilePage, icon: 'person' },
      { title: 'Mis coches', component: ViewCarPage, icon: 'ios-car' },
      { title: 'Mis viajes', component: ViewTripsPage, icon: 'ios-contact'},
      { title: 'Buscar viajes', component: SearchTripPage, icon: 'search'},
      { title: 'Crear viaje', component: CreateTripPage, icon: 'ios-contact'}
    ];
    this.menuService.addPages(pages);
    this.navCtrl.setRoot(SearchTripPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GettingStartedPage');

  }

}
