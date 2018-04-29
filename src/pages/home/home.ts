import { Component } from '@angular/core';
import { IonicPage, NavController,} from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';

import { UserRestfulServiceProvider } from "../../providers/user-restful-service/user-restful-service";
import { ReadHeadersServiceProvider } from "../../providers/read-headers-service/read-headers-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { MenuServiceProvider } from "../../providers/menu-service/menu-service";

import { RegisterUserPage } from "../register-user/register-user";
import { ProfilePage } from "../profile/profile";
import { ViewCarPage } from "../view-car/view-car";
import { ViewTripsPage } from "../view-trips/view-trips";
import { CreateTripPage } from "../create-trip/create-trip";
import { SearchTripPage } from "../search-trip/search-trip";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myForm: FormGroup;
  mensaje: string;
  res: any;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public restful: UserRestfulServiceProvider, public menuService: MenuServiceProvider) {
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
        let pages = [
          { title: 'Mi perfil', component: ProfilePage, icon: 'person' },
          { title: 'Mis coches', component: ViewCarPage, icon: 'ios-car' },
          { title: 'Mis viajes', component: ViewTripsPage, icon: 'plane'},
          { title: 'Buscar viajes', component: SearchTripPage, icon: 'search'},
          { title: 'Crear viaje', component: CreateTripPage, icon: 'add-circle'}
        ];
        this.menuService.addPages(pages);
        this.navCtrl.setRoot(ProfilePage);
        this.res = response.body;
        StorageServiceProvider.writeValues({"key" : "id", "value" : this.res.data.id});
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
