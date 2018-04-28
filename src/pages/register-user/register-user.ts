import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ProfilePage } from "../profile/profile";
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { ReadHeadersServiceProvider } from "../../providers/read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  myForm: FormGroup;
  mensaje: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public restful: UserRestfulServiceProvider) {
    this.myForm = this.createMyForm();
  }

  onSubmit(){
    this.restful.createUser(this.myForm.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.navCtrl.setRoot(ProfilePage);
      },(response) => {
        this.mensaje ="Introduzca correctamente los datos";
      }
    );
  }

  private createMyForm(){
    return this.formBuilder.group({
      name: [''],
      lastname: [''],
      birthdate: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    });
  }
}
