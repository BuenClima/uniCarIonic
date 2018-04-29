import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripRestfulServiceProvider} from "../../providers/trip-restful-service/trip-restful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";
import {UserRestfulServiceProvider} from "../../providers/user-restful-service/user-restful-service";

/**
 * Generated class for the ViewTripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-trips',
  templateUrl: 'view-trips.html',
})
export class ViewTripsPage {

  data:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public trfs: TripRestfulServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTripsPage');
    this.trfs.myTrips(StorageServiceProvider.readValue('id')).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        console.log(response_headers);
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.data = response.body;
        console.log(response.body)
      },(response) => {
        console.log(response);
      }
    );
  }

}
