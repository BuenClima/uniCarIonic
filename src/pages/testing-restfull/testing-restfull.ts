import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestfullProvider} from "../../providers/restfull/restfull";

@IonicPage()
@Component({
  selector: 'page-testing-restfull',
  templateUrl: 'testing-restfull.html',
})
export class TestingRestfullPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restfull : RestfullProvider) {

  }

  ionViewDidLoad() {
    console.log('Launching restfull service...');
    this.restfull.signIn();

  }

}
