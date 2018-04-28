import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildHeadersServiceProvider } from "../build-headers-service/build-headers-service";
import { ReadHeadersServiceProvider } from "../read-headers-service/read-headers-service";
import {StorageServiceProvider} from "../storage-service/storage-service";

/*

*/
@Injectable()
export class CarResfulServiceProvider {

  baseUrl:string = 'http://localhost:3000/';
  carData:any;


  constructor(public http: HttpClient) {
    this.carData = {
      brand : '',
      model : '',
      registratio : '',
      seats : '',
      year : '',
      id : ''
    };
  }


  public getAllCars(){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/cars',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public getCar(id){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/cars/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public createCar(data){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "application/json",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.post(this.baseUrl + 'v1/cars',
      {
        "brand" : data.brand,
        "model" : data.model,
        "registratio" : data.registratio,
        "seats" : data.seats,
        "year" : data.year
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public deleteCar(id){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.delete(this.baseUrl + 'v1/cars/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public updateCar(){

  }

  public testCarImage(){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "application/json",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let newHeaders= headers.buildHeaders();
    newHeaders = newHeaders.append('content-type',"multipart/form-data");
    newHeaders = newHeaders.append('mimeType',"image/jpeg");
    let response_headers = null;
    return this.http.post(this.baseUrl + 'v1/cars',
      {
        "brand" : "Renault",
        "model" : "Megane",
        "registratio" : "2018-12-12",
        "seats" : "4",
        "year" : "2018",
        "image" : "/home/sora/Downloads/renault.jpeg"
      },
      {
        headers : newHeaders,
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }
}
