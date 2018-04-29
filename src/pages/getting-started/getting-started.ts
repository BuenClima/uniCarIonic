import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rAf = (function () {
      return (window as any).requestAnimationFrame || (window as any).webkitRequestAnimationFrame || (window as any).mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000/ 60);
      };
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GettingStartedPage');
  }

}
