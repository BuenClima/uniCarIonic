import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildHeadersServiceProvider } from "../build-headers-service/build-headers-service";
import { ReadHeadersServiceProvider } from "../read-headers-service/read-headers-service";

/*
  Generated class for the CarResfulServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarResfulServiceProvider {

  baseUrl:string = 'http://178.62.2.17/';
  carData:any;
  token:string = '';
  uid:string = '';
  client:string = '';

  constructor(public http: HttpClient, token: string, uid: string, client: string) {
    this.carData = {
      brand : '',
      model : '',
      registratio : '',
      seats : '',
      year : '',
      id : ''
    };
    this.token = token;
    this.uid = uid;
    this.client = client;
  }


  public getAllCars(){
    let headers = new BuildHeadersServiceProvider(this.token, "",this.client, this.uid);
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/cars',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        this.token = response_headers.getToken();
        this.client = response_headers.getClient();
        this.uid = response_headers.getUid();
      },(response) => {
        console.log(response);
      }
    );
  }

  public getCar(id){
    let headers = new BuildHeadersServiceProvider(this.token, "",this.client, this.uid);
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/cars/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        this.token = response_headers.getToken();
        this.client = response_headers.getClient();
        this.uid = response_headers.getUid();
      },(response) => {
        console.log(response);
      }
    );
  }

  public createCar(data){
    let headers = new BuildHeadersServiceProvider(this.token, "",this.client, this.uid);
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
        this.token = response_headers.getToken();
        this.client = response_headers.getClient();
        this.uid = response_headers.getUid();
      },(response) => {
        console.log(response);
      }
    );
  }

  public deleteCar(id){
    let headers = new BuildHeadersServiceProvider(this.token, "",this.client, this.uid);
    let response_headers = null;
    return this.http.delete(this.baseUrl + 'v1/cars/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.carData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        this.token = response_headers.getToken();
        this.client = response_headers.getClient();
        this.uid = response_headers.getUid();
      },(response) => {
        console.log(response);
      }
    );
  }

  public updateCar(){

  }
}
