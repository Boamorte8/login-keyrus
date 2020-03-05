import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomService {

  /**
   * Creates an instance of HttpCustomService.
   * @param {HttpClient} http
   * @memberof HttpCustomService
   */
  constructor(private http: HttpClient) { }

  /**
   * Function to get the data of people
   *
   * @returns
   * @memberof HttpCustomService
   */
  getPeople() {
    const url = 'https://swapi.co/api/people/ ';
    return this.http.get(url);
  }

  /**
   * Function to get data from a url
   *
   * @param {string} url
   * @returns
   * @memberof HttpCustomService
   */
  getDataByUrl(url: string) {
    return this.http.get(url);
  }
}
