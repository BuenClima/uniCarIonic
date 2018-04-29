import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  response:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ursp: UserRestfulServiceProvider) {
    this.response = {
      data : {
        name : '',
        last_name: '',
        birthdate: '',
        email: ''
      }
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let response_headers = null;
    this.ursp.validateToken().subscribe(
      (response) => {
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.response = response.body;
        console.log(this.response);
      },(response) => {
        console.log(response);
      }
    );
  }

}
