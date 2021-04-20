import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { Sidekick } from './sidekick';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';

//import * as auth from './authconfig.json';

// This decorator allows the HeroService class to be injected into other classes.
@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = "https://tohfunctionapi.azure-api.net/FunctionApp220210412114342/HeroesWithSidekicks";  // URL to web api, if i were to create an actual heroes api i would replace this with the url to that and then delete the in-data-memory mock server.

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /* In getHeroes an http request is called, with a get request, this comes from the injected variable http, which was called in the constructor.
  This comes from the class HttpClient, which was injected from the node_modules folder.
  This http request is intercepted by the mock server that was set up using in-memory-data.service, in a production app you would delete this and allow the requests to reach whatever api you are trying to call on.
  The mock server responds with an array of heroes. 
  */
  getHeroes(): Observable<Hero[]> {
    const url = `${this.heroesUrl}/heroes`;
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /* In getHero a different http request is called, this is a get that is looking for a specific hero in the array that we were getting in the previous method.
  This request requires an id parameter in order to determine which hero the get is actually requesting. So the first thing in the method is to add on to the heroesUrl variable to include the id parameter.
  Then the get request goes through being intercepted by the mock server.
  */
  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/hero/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /*
  This is another http request this time though it is a put request in order to update the hero.
  This takes in the url that is being called, (so an interface is like a template for an object?) and in this instance, a specific object that was created using the hero interface is being updated.
  So, the hero's id remains the same so that the api can determine which hero needs to be updated. using that id the object that is in the api gets replaced with the new object.
  */
  updateHero(hero: Hero): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/hero/${id}`;
    return this.http.put(url, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // Another http request, this is a post request that takes the name parameter and creates a new hero based off of the Hero interface, and adds it to the heroes array, the id automatically being generated.*/
  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/add`;
    return this.http.post<Hero>(url, hero).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /* another http request, this deletes the hero with the id specified by the specific interface in the parameter
   what does the straight vertical line mean/do in the method. 
  */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/hero/${id}`;

    return this.http.delete<Hero>(url).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // this http request, gets an array of heroes based on the term provided by the text box.
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/search/${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  // Sidekicks
  addSidekick(sidekick: Sidekick): Observable<Sidekick> {
    const url = `${this.heroesUrl}/addSidekick`;
    return this.http.post<Sidekick>(url, sidekick).pipe(
      tap((newSidekick: Sidekick) => this.log(`added hero w/ id=${newSidekick.id}`)),
      catchError(this.handleError<Sidekick>('addSidekick'))
    );
  }

  deleteSidekick(sidekick: Sidekick | number): Observable<Sidekick> {
    const id = typeof sidekick === 'number' ? sidekick : sidekick.id;
    const url = `${this.heroesUrl}/sidekick/${id}`;

    return this.http.delete<Sidekick>(url).pipe(
      tap(_ => this.log(`deleted sidekick id=${id}`)),
      catchError(this.handleError<Sidekick>('deleteSidekick'))
    );
  }

  getSidekicks(): Observable<Sidekick[]> {
    const url = `${this.heroesUrl}/sidekicks`;
    return this.http.get<Sidekick[]>(url)
      .pipe(
        tap(_ => this.log('fetched Sidekicks')),
        catchError(this.handleError<Sidekick[]>('getSidekicks', []))
      );
  }

  getHeroSidekicks(id: string): Observable<Sidekick[]> {
    const url = `${this.heroesUrl}/hero/${id}/sidekicks`;
    return this.http.get<Sidekick[]>(url)
      .pipe(
        tap(_ => this.log('fetched Sidekicks')),
        catchError(this.handleError<Sidekick[]>('getSidekicks', []))
      );
  }

  getSidekick(id: string): Observable<Sidekick> {
    const url = `${this.heroesUrl}/sidekick/${id}`;
    return this.http.get<Sidekick>(url).pipe(
      tap(_ => this.log(`fetched sidekick id=${id}`)),
      catchError(this.handleError<Sidekick>(`getSidekick id=${id}`))
    );
  }

  updateSidekick(sidekick: Sidekick): Observable<any> {
    const id = typeof sidekick === 'number' ? sidekick : sidekick.id;
    const url = `${this.heroesUrl}/sidekick/${id}`;
    return this.http.put(url, sidekick).pipe(
      tap(_ => this.log(`updated sidekick id=${sidekick.id}`)),
      catchError(this.handleError<any>('updateSidekick'))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    // Why do these need to be included in the constructor but the HttpHeaders class doesn't? because these two classes are being used as variables, and the HttpHeaders class aren't.
  ) { }
}
