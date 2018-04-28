import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildHeadersServiceProvider } from "../build-headers-service/build-headers-service";
import { ReadHeadersServiceProvider } from "../read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../storage-service/storage-service";

/*
    All services that use the this.token are not valid need to create local storage or cookies
*/
@Injectable()
export class UserRestfulServiceProvider {

  baseUrl:string = 'http://178.62.2.17/';
  userData:any;

  constructor(public http: HttpClient) {
    this.userData = {
      'id' : '',
      'email' : '',
      'name' : '',
      'nickname' : '',
      'last_name' : '',
      'birthdate' : ''
    };
  }


  public createUser(data){
    let headers = new BuildHeadersServiceProvider('','application/json');
    return this.http.post(this.baseUrl + 'auth',{
      "email" : data.email,
      "password" : data.password,
      "password_confirmation" : data.password_confirmation,
      "name" : data.name,
      "lastname" : data.lastname,
      "birthdate" : data.birthdate
    },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      })
  }

  public signInUser(data){
    let headers = new BuildHeadersServiceProvider('','application/json');
    return this.http.post(this.baseUrl + 'auth/sign_in',{
        "email" : data.email,
        "password" : data.password,
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      })
  }

  public validateToken(){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    let response_headers = null;
    return this.http.get(this.baseUrl + 'auth/validate_token',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.userData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
      },(response) => {
        console.log(response);
      }
    );
  }

  public signOutUser(){
    let headers = new BuildHeadersServiceProvider(
      StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    return this.http.delete(this.baseUrl + 'auth/sign_out',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        console.log(response.body);
      },(response) => {
        console.log(response);
      }
    );
  }

  // Need to take a look if update with RAILS model or CUSTOM model,
  // Maybe 2 calls to 2 different URL
  public updateUser(){

  }

  public deleteUser(){
    let headers = new BuildHeadersServiceProvider(StorageServiceProvider.readValue("token"),
      "",
      StorageServiceProvider.readValue("client"),
      StorageServiceProvider.readValue("uid"));
    return this.http.delete(this.baseUrl + 'auth',
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        console.log(response.body);
      },(response) => {
        console.log(response);
      }
    );
  }

  public getUserData(){
    return this.userData;
  }
}
