import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { HttpClient } from "@angular/common/http";
import { TripRestfulServiceProvider } from "../../providers/trip-restful-service/trip-restful-service";
import { CityRestulServiceProvider } from "../../providers/city-restul-service/city-restul-service";
import { CarResfulServiceProvider } from "../../providers/car-resful-service/car-resful-service";
import { PassengerRestfulServiceProvider } from "../../providers/passenger-restful-service/passenger-restful-service";

/**
  Testing restful services
 */

@IonicPage()
@Component({
  selector: 'page-testing-restul-services',
  templateUrl: 'testing-restul-services.html',
})
export class TestingRestulServicesPage {

  public http:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              http: HttpClient, public ursp : UserRestfulServiceProvider,
              public trsp : TripRestfulServiceProvider, public cityrsp : CityRestulServiceProvider,
              public carrsp : CarResfulServiceProvider, public prsp : PassengerRestfulServiceProvider) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('Launching queries to server...');
    //this.ursp.signInUser({"email" : "testingIonic1@test.com", "password" : "testionic"});
    this.ursp.signInUser({"email" : "test@test.com", "password" : "testpassword1"});
    //this.ursp.validateToken();
    //this.ursp.createUser({"email" : "testingIonic5@test.com", "password" : "testionic", "password_confirmation" : "testionic"});
    //this.ursp.signOutUser();
    //this.ursp.deleteUser();

    //Cars tests
    /*this.carrsp.createCar({"registratio": "2012-10-10",
      "brand": "Toyota",
      "model": "Corolla",
      "year": "1995",
      "seats" : 4});*/
    //this.carrsp.getAllCars();
    //this.carrsp.deleteCar();
    //this.carrsp.getCar();
    this.carrsp.testCarImage();

    // Trips tests
    //this.trsp.getAllTrips();
    /*this.trsp.createTrip({
      "departure_time" : "2018-10-10 08:00:00",
      "arrival_time" : "2018-10-10 08:30:00",
      "car" : 2,
      "city_origin_id" : 1,
      "city_destination_id" : 2
    });*/
    //this.trsp.deleteTrip();

    //Cities tests
    //this.cityrsp.createCity({"name" : "Maspalomas"});
    //this.cityrsp.getAllCities();
    //this.cityrsp.deleteCity();
    //this.cityrsp.getCar();

    //Passengers tests
    /*this.prsp.createPassenger({
      "user" : 3,
      "trip" : 1
    });*/
    //this.prsp.getAllPassengers();
    //this.prsp.getPassenger();
    //this.prsp.deletePassenger();

  }

}
