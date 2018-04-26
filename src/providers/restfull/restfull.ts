import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestfullProvider {
  baseUrl: string = "http://192.168.1.19:5000";

  constructor(public http: HttpClient) {
    console.log('Hello RestfullProvider Provider');
  }

  private static buildHeaders(params: Array<string>) {
    return new HttpHeaders({
      'Content-Type': params[0],
      'access-token': params[1],
      'client': params[2],
      'uid': params[3]
    });
  }

  public signIn() {
    var headers = RestfullProvider.buildHeaders(["application/json", "", "", ""]);
    return this.http.post(this.baseUrl + '/auth/sign_in',
      {
        "email": "test@test.com",
        "password": "testpassword1"

      },
      {
        headers: headers,
        observe: "response"
      });

  }
}
