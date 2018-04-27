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

  constructor(private storage: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('Launching storage tests...');

    this.storage.writeValues({"key" : "token", "value" : "12345"});
    console.log(this.storage.readValue("token"));
    this.storage.writeValues({"key" : "token", "value" : "diego"});
    console.log(this.storage.readValue("token"));

  }

}
