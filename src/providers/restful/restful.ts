import { HttpClientModule } from  '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestfulProvider {

  constructor(public http: HttpClientModule) {
    console.log('Hello RestfulProvider Provider');
  }

}
