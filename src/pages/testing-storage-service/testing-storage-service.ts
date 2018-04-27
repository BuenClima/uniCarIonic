import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

/**

 */

@IonicPage()
@Component({
  selector: 'page-testing-storage-service',
  templateUrl: 'testing-storage-service.html',
})
export class TestingStorageServicePage {

  constructor() {
  }

  ionViewDidLoad() {
    console.log('Launching storage tests...');

    StorageServiceProvider.writeValues({"key" : "token", "value" : "12345"});
    console.log(StorageServiceProvider.readValue("token"));
    StorageServiceProvider.writeValues({"key" : "token", "value" : "diego"});
    console.log(StorageServiceProvider.readValue("token"));

  }

}
