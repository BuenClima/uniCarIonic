import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BuildHeadersServiceProvider} from "../build-headers-service/build-headers-service";
import {StorageServiceProvider} from "../storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../read-headers-service/read-headers-service";

/*

*/
@Injectable()
export class CityRestulServiceProvider {

  baseUrl:string = 'http://178.62.2.17/';
  cityData:any;

  constructor(public http: HttpClient) {
    this.cityData = {
      "id" : '',
      "name" : ''
    };
  }

  public getAllCities(){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/cities',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.cityData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public getCity(id){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'v1/cities/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.cityData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public createCity(data){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "application/json",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.post(this.baseUrl + 'v1/cities',
      {
        "name" : data.name
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.cityData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public deleteCity(id){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.delete(this.baseUrl + 'v1/cities/'+ id,
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.cityData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public updateCity(){

  }
}
