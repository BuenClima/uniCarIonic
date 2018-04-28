import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CameraServiceProvider} from "../../providers/camera-service/camera-service";
import { Camera } from "@ionic-native/camera";

/**
 * Generated class for the TestCameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test-camera',
  templateUrl: 'test-camera.html',
})
export class TestCameraPage {

  camera:Camera;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cam: Camera) {
    this.camera = cam;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestCameraPage');
  }

  public takePicture(){
    this.cam.getPicture({
      destinationType: this.cam.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
