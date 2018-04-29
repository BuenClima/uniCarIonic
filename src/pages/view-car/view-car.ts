import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CarResfulServiceProvider} from "../../providers/car-resful-service/car-resful-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {ReadHeadersServiceProvider} from "../../providers/read-headers-service/read-headers-service";
import {FormBuilder} from "@angular/forms";
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-car',
  templateUrl: 'view-car.html',
})
export class ViewCarPage {

  response:any;
  deleteCarMessage:string = '';
  createCarStatus:string = "view";
  carForm:any;
  mensajeBrand: string;
  mensajeYear: string;
  mensajeRegistratio: string;
  mensajeSeats: string;
  mensajeModel: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public crfs: CarResfulServiceProvider, public formBuilder: FormBuilder,private alertCtrl: AlertController) {
    this.response = {
      brand: '',
      model: '',
      registratio: '',
      seats: '',
      year: ''
    };
    this.carForm = this.buildCarForm();
  }

  presentConfirm(id) {
    let alert = this.alertCtrl.create({
      title: '¿Quiere borrar su coche?',
      message: '¿Está seguro de querer borrar su coche?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            this.deleteCar(id);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.deleteCarMessage = '';
    this.crfs.getAllCars().subscribe(
      (response) => {
        let response_headers = null;
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

  public deleteCar(id){
    this.crfs.deleteCar(id).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.deleteCarMessage = "Borrado correctamente!";
        this.ionViewDidLoad();
      },(response) => {
        console.log(response);
      }
    );
  }

  public createCar(){
    this.createCarStatus = "create";
  }

  public onSubmit(){
    this.crfs.createCar(this.carForm.value).subscribe(
      (response) => {
        let response_headers = null;
        response_headers = new ReadHeadersServiceProvider(response.headers.keys().map(key => `${key}: ${response.headers.get(key)}`));
        StorageServiceProvider.writeValues({"key" : "token", "value" : response_headers.getToken()});
        StorageServiceProvider.writeValues({"key" : "client", "value" : response_headers.getClient()});
        StorageServiceProvider.writeValues({"key" : "uid", "value" : response_headers.getUid()});
        this.createCarStatus = 'view';
        this.ionViewDidLoad();
      },(response) => {
        console.log(response);
        if(this.carForm.controls.brand.value == "") {
          this.mensajeBrand = "La marca no puede estar vacía";
        }
        if(this.carForm.controls.year.value == "") {
          this.mensajeYear = "El año no puede estar vacío";
        }
        if(this.carForm.controls.registratio.value == "") {
          this.mensajeRegistratio = "La matrícula no puede estar vacía";
        }
        if(this.carForm.controls.seats.value == "") {
          this.mensajeSeats = "El número de asientos no puede estar vacío";
        }
        if(this.carForm.controls.model.value == "") {
          this.mensajeModel = "El modelo no puede estar vacío";
        }
      }
    );
  }

  private buildCarForm(){
    return this.formBuilder.group({
      brand:[''],
      model:[''],
      registratio: [''],
      year: [''],
      seats: ['']
    });
  }

}
