import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripRestfulServiceProvider} from "../../providers/trip-restful-service/trip-restful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";
import {PassengerRestfulServiceProvider} from "../../providers/passenger-restful-service/passenger-restful-service";

@IonicPage()
@Component({
  selector: 'page-view-trips',
  templateUrl: 'view-trips.html',
})
export class ViewTripsPage {

  data:any = [];
  tripStatus:string = 'view';
  detailsResponse:any;
  details:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public trfs: TripRestfulServiceProvider, public passengerrfs: PassengerRestfulServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTripsPage');
    this.tripStatus = 'view';
    this.trfs.myTrips(StorageServiceProvider.readValue('id')).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        console.log(response_headers);
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.data = response.body;
        console.log (this.data);
      },(response) => {
        console.log(response);
      }
    );
  }

  public viewDetails(id){

    this.trfs.getTrip(id).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.detailsResponse = response.body;
        this.details = this.detailsResponse.data;
        console.log(this.details);
        this.tripStatus = 'details';
      },(response) => {
        console.log(response);
      }
    );
  }

  public cancelTrip(id) {
    this.passengerrfs.deletePassenger(id).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.ionViewDidLoad();
      },(response) => {
        console.log(response);
      }
    );
  }
}
