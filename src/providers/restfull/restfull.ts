import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestfullProvider {

  baseUrl:string  = "http://192.168.1.19:5000";

  constructor(public http: HttpClient) {
    console.log('Hello RestfullProvider Provider');
  }

  private static buildHeaders(params : Array<string>){
    return new HttpHeaders({'Content-Type' : params[0],
                                    'access-token' : params[1],
                                    'client' : params[2],
                                    'uid' : params[3]});
  }

  public signIn(){
    var headers = RestfullProvider.buildHeaders(["application/json","","",""]);
    return this.http.post(this.baseUrl + '/auth/sign_in',
      {
        "email": "test@test.com",
        "password": "testpassword1"

      },
      {
        headers : headers,
        observe : "response"
      }
      ).subscribe(
      (resp) => {
        console.log("resp-ok");
        console.log(resp.headers.keys().map(key => `${key}: ${resp.headers.get(key)}`));
        console.log(resp.body)
        this.getAllCars(resp.headers.keys().map(key => `${key}: ${resp.headers.get(key)}`));
      },
      (resp) => {
        console.log("resp-error");
        console.log(resp);
      }
    );
  }

  public getAllCars(params :Array<string> ){
    var token = "";
    var uid = "";
    var client = "";
    for (let param of params){
      if (param.startsWith("access")){
        token = RestfullProvider.formatParameters(param);
      }
      if (param.startsWith("client")){
        client = RestfullProvider.formatParameters(param);
      }
      if (param.startsWith("uid")) {
        uid = RestfullProvider.formatParameters(param);
      }
    }
    var headers = RestfullProvider.buildHeaders(["application/json",token,client,uid]);

    return this.http.get(this.baseUrl + '/v1/cars', {
      headers : headers,
      observe : "response"
    }).subscribe(
      (response) => {
          console.log(response.body);
      },(response) => {
        console.log("resp-error");
        console.log(response);
      }
    );
  }


  private static formatParameters(param : string){
    return param.split(":")[1].trim();
  }

}
