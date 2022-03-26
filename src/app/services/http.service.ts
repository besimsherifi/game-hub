import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse } from '../models/api-response.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering:string, search?:string): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('oredering', ordering);
    if(search){
      params = new HttpParams().set('oredering', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
      params: params,
    });
  }

  getGameDetails (id: string) {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenShotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin ({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenShotsRequest
    }).pipe(
      map((resp: any)=>{
        return{
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenShotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results
        }
      })
    )
  }

getUsers() {
  return this.http.get('http://jsonplaceholder.typicode.com/users');
}


getPosts () {
  return this.http.get('http://jsonplaceholder.typicode.com/posts');

}

}
