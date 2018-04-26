import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestfullProvider} from "../../providers/restfull/restfull";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-testing-restfull',
  templateUrl: 'testing-restfull.html',
})
export class TestingRestfullPage {

  public http:any;
  public data: any;

  baseUrl: string = "http://192.168.1.19:5000";
  constructor(public navCtrl: NavController, public navParams: NavParams, public restfull : RestfullProvider, http: HttpClient) {
    this.http = http;
    this.data = {
      brand: '',
      model: '',
      registratio: '',
      seats: '',
      year: ''
    }
  }

  ionViewDidLoad() {
    console.log('Launching restfull service...');
    this.restfull.signIn().subscribe(
      (resp) => {
        console.log("resp-ok");
        console.log(resp.headers.keys().map(key => `${key}: ${resp.headers.get(key)}`));
        console.log(resp.body)
        this.getAllCars(resp.headers.keys().map(key => `${key}: ${resp.headers.get(key)}`));
      },
      (resp) => {
        console.log("resp-error");
        console.log(resp);
      }
    );
  }

  private static buildHeaders(params: Array<string>) {
    return new HttpHeaders({
      'Content-Type': params[0],
      'access-token': params[1],
      'client': params[2],
      'uid': params[3]
    });
  }

  public getAllCars(params :Array<string> ){
    var token = "";
    var uid = "";
    var client = "";
    for (let param of params){
      if (param.startsWith("access")){
        token = TestingRestfullPage.formatParameters(param);
      }
      if (param.startsWith("client")){
        client = TestingRestfullPage.formatParameters(param);
      }
      if (param.startsWith("uid")) {
        uid = TestingRestfullPage.formatParameters(param);
      }
    }
    var headers = TestingRestfullPage.buildHeaders(["application/json",token,client,uid]);

    return this.http.get(this.baseUrl + '/v1/cars', {
      headers : headers,
      observe : "response"
    }).subscribe(
      (response) => {
        this.data = response.body;
        console.log(response.body);
      },(response) => {
        console.log("resp-error");
        console.log(response);
      }
    );
  }


  private static formatParameters(param : string){
    return param.split(":")[1].trim();
  }


}
