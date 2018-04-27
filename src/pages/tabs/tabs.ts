import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TestingRestulServicesPage } from '../testing-restul-services/testing-restul-services';
import { TestingStorageServicePage } from "../testing-storage-service/testing-storage-service";

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TestingStorageServicePage;
  tab3Root = TestingRestulServicesPage;

  constructor() {
  }

}
