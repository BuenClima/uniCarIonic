import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CityRestulServiceProvider} from "../../providers/city-restul-service/city-restul-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TripRestfulServiceProvider} from "../../providers/trip-restful-service/trip-restful-service";
import {PassengerRestfulServiceProvider} from "../../providers/passenger-restful-service/passenger-restful-service";

@IonicPage()
@Component({
  selector: 'page-search-trip',
  templateUrl: 'search-trip.html',
})
export class SearchTripPage {

  cities:any;
  responseCities:any;
  searchTripForm:FormGroup;
  originCityMessage:string;
  destinationCityMessage:string;
  responseTrips:any = null;
  messageOnSuccessPassenger:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cityrfs: CityRestulServiceProvider, public formBuilder: FormBuilder,
              public triprfs: TripRestfulServiceProvider, public passengerrfs: PassengerRestfulServiceProvider) {
    this.searchTripForm = this.createSearchTripForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTripPage');
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
    console.log(this.searchTripForm.value);
    this.responseTrips = null;
    this.messageOnSuccessPassenger = '';
    this.triprfs.searchTrip(this.searchTripForm.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        //Aqui dentro esta el response
        this.responseTrips = response.body;
        console.log(response.body);
      },(response) => {
        console.log(response);
      }
    );
  }

  public travelOntrip(trip){
    this.passengerrfs.createPassenger({
      "user" : StorageServiceProvider.readValue('id'),
      "trip" : trip.id
    }).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        console.log(response.body);
        this.messageOnSuccessPassenger = "¡Añadido al viaje!";
      },(response) => {
        console.log(response);
        this.messageOnSuccessPassenger = "No hay viajes que coincidan con la búsqueda";
      }
    );;
  }

  private createSearchTripForm(){
    return this.formBuilder.group({
      from : [''],
      to : [''],
      date : ['']
    });
  }

}
