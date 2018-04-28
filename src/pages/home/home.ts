import { Component } from '@angular/core';
import { IonicPage, NavController,} from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ProfilePage } from "../profile/profile";
import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { ReadHeadersServiceProvider } from "../../providers/read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { RegisterUserPage } from "../register-user/register-user";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myForm: FormGroup;
  mensaje: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public restful: UserRestfulServiceProvider) {
    this.myForm = this.createMyForm();
  }

  onSubmit(){
    this.restful.signInUser(this.myForm.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.navCtrl.setRoot(ProfilePage);
      },(response) => {
        this.mensaje ="Introduzca correctamente usuario y contraseña";
      }
    );
  }

  private createMyForm(){
    return this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  goToRegistration () {
    this.navCtrl.push(RegisterUserPage);
  }
}
