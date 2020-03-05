import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { map } from 'rxjs/operators';

import { environment } from './../environments/environment';

import { HttpCustomService } from './services/http/http-custom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Version of the project
   *
   * @memberof AppComponent
   */
  version = environment.version;

  /**
   * Form login control
   *
   * @memberof AppComponent
   */
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  /**
   * Flag to know if form was validated
   *
   * @memberof AppComponent
   */
  isValidatedForm = false;

  constructor(private httpCustomService: HttpCustomService) {}

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnInit() {
    this.httpCustomService.getPeople().subscribe((people: any) => {
      people.results.forEach((person: any) => this.printDataPerson(person));
    });
    this.formLogin.valueChanges.subscribe(value => {
      this.isValidatedForm = false;
    });
  }

  onValidateForm() {
    this.isValidatedForm = true;
    console.log(this.formLogin);
  }

  /**
   *
   *
   * @param {*} personData
   * @memberof AppComponent
   */
  async printDataPerson(personData: any) {
    const person = {
      name: personData.name,
      hair_color: personData.hair_color,
      skin_color: personData.skin_color,
      gender: personData.gender,
      homeworld: await this.getHomeworld(personData.homeworld),
      films: await this.getFilms(personData.films),
    };
    console.log(person);
  }

  /**
   *
   *
   * @param {string} homeworldUrl
   * @returns
   * @memberof AppComponent
   */
  async getHomeworld(homeworldUrl: string) {
    const result = await this.httpCustomService.getDataByUrl(homeworldUrl).pipe(
      map((data: any) => {
        return {
          name: data.name,
          terrain: data.terrain,
          gravity: data.gravity,
          climate: data.climate,
          population: data.population
          ,
        };
      })
    ).toPromise();
    return result;
  }

  /**
   *
   *
   * @param {any[]} films
   * @memberof AppComponent
   */
  async getFilms(films: any[]) {
    const filmsData = films.map(async (film) => {
      const result = await this.getFilm(film);
      return result;
    });
    return await Promise.all(filmsData);
  }

  /**
   *
   *
   * @param {string} film
   * @returns
   * @memberof AppComponent
   */
  async getFilm(film: string) {
    const result = await this.httpCustomService.getDataByUrl(film).pipe(
      map((data: any) => {
        return {
          title: data.title,
          episode_id: data.episode_id,
          opening_crawl: data.opening_crawl,
          director: data.director,
        };
      })
    ).toPromise();
    return result;
  }
}
