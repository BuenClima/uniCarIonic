import { Injectable } from '@angular/core';

@Injectable()
export class StorageServiceProvider {


  constructor() {
  }

  public static readValue(key){
    return localStorage.getItem(key);
  }

  public static writeValues(params){
    localStorage.setItem(params.key, params.value);
  }

}
