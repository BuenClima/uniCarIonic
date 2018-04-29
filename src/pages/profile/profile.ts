import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";
import {FormBuilder} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  response:any;
  profileStatus:string = "view";
  profileForm:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ursp: UserRestfulServiceProvider, public formBuilder: FormBuilder) {
    this.response = {
      data : {
        name : '',
        last_name: '',
        birthdate: '',
        email: ''
      }
    };
    this.profileForm = this.createEditProfileForm();
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
        this.profileStatus = "view";
      },(response) => {
        console.log(response);
      }
    );
  }

  public editProfile() {
    this.profileStatus = "edit";
  }

  public onSubmit(){
    console.log(StorageServiceProvider.readValue('id'));
    console.log(this.profileForm.value.name);
    this.ursp.updateUser(this.profileForm.value,StorageServiceProvider.readValue('id')).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.response = response.body;
        console.log(response.body);
        this.ionViewDidLoad();
      },(response) => {
        console.log(response);
      }
    );

  }

  private createEditProfileForm(){
    return this.formBuilder.group({
      name: [''],
      last_name: [''],
      birthdate:['']
    });
  }
}
