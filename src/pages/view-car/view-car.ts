import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CarResfulServiceProvider} from "../../providers/car-resful-service/car-resful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";

/**
 * Generated class for the ViewCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-car',
  templateUrl: 'view-car.html',
})
export class ViewCarPage {

  response:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public crfs: CarResfulServiceProvider) {
    this.response = {
      brand: '',
      model: '',
      registratio: '',
      seats: '',
      year: ''
    }
  }

  ionViewDidLoad() {
    this.crfs.getAllCars().subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.response = response.body;
        console.log(this.response);
      },(response) => {
        console.log(response);
      }
    );
  }

}
