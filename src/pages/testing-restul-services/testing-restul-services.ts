import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { HttpClient } from "@angular/common/http";

/**
  Testing restful services
 */

@IonicPage()
@Component({
  selector: 'page-testing-restul-services',
  templateUrl: 'testing-restul-services.html',
})
export class TestingRestulServicesPage {

  public http:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              http: HttpClient, public ursp : UserRestfulServiceProvider) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('Launching queries to server...');
    //this.ursp.createUser({"email" : "testingIonic2@test.com", "password" : "testionic", "password_confirmation" : "testionic"});
    //this.ursp.signInUser({"email" : "testingIonic1@test.com", "password" : "testionic"});
    //this.ursp.signOutUser();
    //this.ursp.deleteUser();
  }

}
