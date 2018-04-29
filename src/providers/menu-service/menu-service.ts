import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MenuServiceProvider {

  private _pages: Subject<Array<{title: string, component: any, icon: String}>>;

  constructor(public http: HttpClient) {
    this._pages = new Subject<Array<{title: string, component: any, icon: String}>>();
  }

  getPages(): Observable<Array<{title: string, component: any, icon: String}>> {
    return this._pages.asObservable()
  }

  addPages(pages: Array<{title: string, component: any, icon: String}>) {
    this._pages.next(pages);
  }

}
