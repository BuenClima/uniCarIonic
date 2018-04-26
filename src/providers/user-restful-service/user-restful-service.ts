import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildHeadersServiceProvider } from "../build-headers-service/build-headers-service";
import { ReadHeadersServiceProvider } from "../read-headers-service/read-headers-service";

/*

*/
@Injectable()
export class UserRestfulServiceProvider {

  baseUrl:string = 'http://178.62.2.17/';
  userData:any;
  token:string = '';
  uid:string = '';
  client:string = '';

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
    var headers = new BuildHeadersServiceProvider('','application/json');
    var response_headers = null;
    return this.http.post(this.baseUrl + 'auth/',{
      "email" : data.email,
      "password" : data.password,
      "password_confirmation" : data.password_confirmation
    },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.userData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        this.token = response_headers.getToken();
        this.client = response_headers.getClient();
        this.uid = response_headers.getUid();
        console.log(response_headers.getToken());
      },(response) => {
        console.log(response)
      }
    );
  }

  public signInUser(data){
    var headers = new BuildHeadersServiceProvider('','application/json');
    var response_headers = null;
    return this.http.post(this.baseUrl + 'auth/',{
        "email" : data.email,
        "password" : data.password,
      },
      {
        headers : headers.buildHeaders(),
        observe : "response"
      }).subscribe(
      (response) => {
        this.userData = response.body;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        this.token = response_headers.getToken();
        this.client = response_headers.getClient();
        this.uid = response_headers.getUid();
        console.log(response_headers.getToken());
      },(response) => {
        console.log(response)
      }
    );
  }

  public signOutUser(){

  }

  public updateUser(){

  }

  public deleteUser(){

  }

  public getUserData(){
    return this.userData;
  }
}
