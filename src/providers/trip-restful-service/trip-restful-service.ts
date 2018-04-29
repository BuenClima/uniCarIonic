import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildHeadersServiceProvider } from "../build-headers-service/build-headers-service";
import { ReadHeadersServiceProvider } from "../read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../storage-service/storage-service";
import {DateTime} from "ionic-angular";

/*

*/
@Injectable()
export class TripRestfulServiceProvider {

  baseUrl:string = 'http://178.62.2.17/';
  tripData:any;

  constructor(public http: HttpClient) {
    this.tripData = {
      "id" : '',
      "departure-time" : '',
      "arrival-time" : '',
      "car" : {
        "id": '',
        "registratio": '',
        "brand": '',
        "model": '',
        "year": ''
      },
      "user_id" : '',
      "seats" : '',
      "city-origin-id" : '',
      "city-destination-id" : ''
    }
  }

  public getAllTrips(){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/trips',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.tripData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public getTrip(id){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/trips/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.tripData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
      );
  }

  public createTrip(data){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "application/json",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.post(this.baseUrl + 'v1/trips',
      {
        "departure_time" : data.departure_time,
        "arrival_time" : data.arrival_time,
        "car" : data.car,
        "city_origin_id" : data.city_origin_id,
        "city_destination_id" : data.city_destination_id
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.tripData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public deleteTrip(id){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.delete(this.baseUrl + 'v1/trips/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.tripData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public updateTrip(){

  }

  public searchTrip(data){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "application/json",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.post(this.baseUrl + 'v1/searchTrip',
      {
        "from" : data.from,
        "to" : data.to,
        "date" : new Date().toUTCString(),
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.tripData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public myTrips(data){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "application/json",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.post(this.baseUrl + 'v1/myTrips',
      {
        "trip" : data.trip,
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.tripData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        console.log(response.body)
      },(response) => {
        console.log(response);
      }
    );
  }
}
