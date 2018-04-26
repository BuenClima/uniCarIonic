import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Service providing HttpHeaders required to communicate with the server
*/
@Injectable()
export class BuildHeadersServiceProvider {

  header_token:string = '';
  header_contentType:string  = '';
  header_client:string = '';
  header_uid:string = '';

  constructor(header_token : string = '',
              header_contentType : string = '', header_client : string = '',
              header_uid : string = '') {

    this.header_token = header_token;
    this.header_contentType = header_contentType;
    this.header_client  = header_client;
    this.header_uid = header_uid;
  }

  public buildHeaders(){
    return new HttpHeaders({
      'Content-Type' : this.header_contentType,
      'access-token' : this.header_token,
      'client' : this.header_client,
      'uid' : this.header_uid
    });
  }
}
