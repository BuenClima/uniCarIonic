import { Injectable } from '@angular/core';

/*
  Service providing reading headers sent by Server
*/

@Injectable()
export class ReadHeadersServiceProvider {

  headers:Array<string> = [];
  token:string = '';
  client:string = '';
  uid:string = '';

  constructor(params : Array<string>) {
    this.headers = params;
    for (let header of this.headers){
      if (header.startsWith('access')){
        this.token = this.formatParameters(header);
      }
      if (header.startsWith('client')){
        this.client = this.formatParameters(header);
      }
      if (header.startsWith('uid')){
        this.uid = this.formatParameters(header);
      }
    }
  }

  public getToken(){
    return this.token;
  }

  public getClient(){
    return this.client;
  }

  public getUid(){
    return this.uid;
  }

  private formatParameters(param : string){
    return param.split(":")[1].trim();
  }
}
