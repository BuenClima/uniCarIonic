import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*

*/
@Injectable()
export class CameraServiceProvider {

  cameraOptions:CameraOptions = {};

  constructor(private camera: Camera) {
    this.cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.CAMERA
    };
  }


  public takePicture(){
    return this.camera.getPicture(this.cameraOptions);
  }
}
