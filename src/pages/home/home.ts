import { Component } from '@angular/core';
import { IonicPage, NavController,} from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ProfilePage } from "../profile/profile";
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { ReadHeadersServiceProvider } from "../../providers/read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public restful: UserRestfulServiceProvider) {
    this.myForm = this.createMyForm();
  }

  onSubmit(){
    console.log(this.myForm.value);
    console.log({"email" : "testingIonic1@test.com", "password" : "testionic"});
    this.restful.signInUser(this.myForm.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.navCtrl.push(ProfilePage);
      },(response) => {
        console.log("Credenciales incorrectas");
      }
    );
  }

  private createMyForm(){
    return this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
}
