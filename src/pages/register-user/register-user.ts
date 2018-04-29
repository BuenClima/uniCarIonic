import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';

import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { ReadHeadersServiceProvider } from "../../providers/read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

import { GettingStartedPage } from "../getting-started/getting-started";

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  myForm: FormGroup;
  mensajeName: string;
  mensajeLastname: string;
  mensajeBirthdate: string;
  mensajeEmail: string;
  mensajePassword: string;
  mensajeConfirmPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public restful: UserRestfulServiceProvider) {
    this.myForm = this.createMyForm();
    console.log (this.myForm);
  }

  onSubmit(){
    this.restful.createUser(this.myForm.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.navCtrl.setRoot(GettingStartedPage);
      },(response) => {
         console.log (response);
         if(this.myForm.controls.name.value == "") {
           this.mensajeName = "El nombre no puede estar vacío";
         }
         if(this.myForm.controls.lastname.value == "") {
           this.mensajeLastname = "Los apellidos no pueden estar vacíos";
         }
         if(this.myForm.controls.birthdate.value == "") {
          this.mensajeBirthdate = "Seleccione una fecha";
         }
         if(this.myForm.controls.password.value.length < 6) {
           this.mensajePassword = "La contraseña debe tener al menos 6 carácteres";
         }
         if(this.myForm.controls.password_confirmation.value != this.myForm.controls.password.value) {
           this.mensajeConfirmPassword = "Las contraseñas no coinciden";
         }
         if(!this.myForm.controls.email.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
           this.mensajeEmail = "Introduzca un formato correcto de email";
         }

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
