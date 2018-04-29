import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripRestfulServiceProvider} from "../../providers/trip-restful-service/trip-restful-service";
import {FormBuilder} from "@angular/forms";
import {CarResfulServiceProvider} from "../../providers/car-resful-service/car-resful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";
import {CityRestulServiceProvider} from "../../providers/city-restul-service/city-restul-service";

@IonicPage()
@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html',
})
export class CreateTripPage {

  departureTimeMessage:string;
  arrivalTimeMessage:string;
  carMessage:string;
  cityOriginMessage:string;
  cityDestinationMessage:string;
  formCreateTrip:any;
  cars:any;
  cities:any;
  responseCities:any;
  carsResponse:any;
  tripCreated:any = null;
  messageOnSuccesfullTripCreated:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public triprfs: TripRestfulServiceProvider, public formBuilder: FormBuilder,
              public carrfs: CarResfulServiceProvider, public cityrfs: CityRestulServiceProvider) {
    this.formCreateTrip = this.createTripForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTripPage');
    this.carrfs.getAllCars().subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.carsResponse = response.body;
        this.cars = this.carsResponse.data;
      },(response) => {
        console.log(response);
      }
    );

    this.cityrfs.getAllCities().subscribe(
      (response) => {
        let response_headers = null;
        this.responseCities = response.body;
        this.cities = this.responseCities.data;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public onSubmit(){
    return this.triprfs.createTrip(this.formCreateTrip.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        let res:any = response.body;
        this.tripCreated = res.data;
        this.messageOnSuccesfullTripCreated = 'Viaje publicado correctamente!';
      },(response) => {
        console.log(response);
      }
    );
  }

  private createTripForm(){
    return this.formBuilder.group({
      departure_time: [''],
      arrival_time : [''],
      car: [''],
      city_origin_id : [''],
      city_destination_id : ['']
    });
  }
}
