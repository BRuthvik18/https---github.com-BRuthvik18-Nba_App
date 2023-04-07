import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TeamData } from './../Models/teams.model';
import { map } from 'rxjs';
import { Games } from '../Models/games.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  public getAllTeamData(): Observable<TeamData[]> {
    return this.http
      .get<TeamData[]>(environment.baseApi, {
        headers: new HttpHeaders()
          .set(environment.HostHeaderName, environment.HostHeaderValue)
          .set(environment.KeyHeaderName, environment.KeyHeaderValue),
        params: new HttpParams().set('page', 0),
      })
      .pipe(map((data: any) => data.data));
  }

  public getTeamById(id: number): Observable<TeamData> {
    return this.http.get<TeamData>(environment.baseApi + '/' + id, {
      headers: new HttpHeaders()
        .set(environment.HostHeaderName, environment.HostHeaderValue)
        .set(environment.KeyHeaderName, environment.KeyHeaderValue),
    });
  }

  public getAllTeamsStats(): Observable<Games[]> {
    return this.http
      .get<Games[]>(environment.base, {
        headers: new HttpHeaders()
          .set(environment.HostHeaderName, environment.HostHeaderValue)
          .set(environment.KeyHeaderName, environment.KeyHeaderValue),
        params: new HttpParams().set('page', 0).set('per_page', 20000),
      })
      .pipe(map((data: any) => data.data));
  }
}
