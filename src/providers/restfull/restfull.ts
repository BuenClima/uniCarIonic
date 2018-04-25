import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestfullProvider {

  baseUrl:string  = "http://192.168.1.19:5000";

  constructor(public http: HttpClient) {
    console.log('Hello RestfullProvider Provider');
  }

  public signIn(){
    let contentHeader = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post(this.baseUrl + '/auth/sign_in',
      { "email" : "test@test.com",
              "password" : "testpassword1"
      },
      {
        headers : contentHeader,
        observe : "response"
      }
      ).subscribe(
      (resp) => {
        console.log("resp-ok");
        console.log(resp.headers);
      },
      (resp) => {
        console.log("resp-error");
        console.log(resp);
      }
    );
  }

}
