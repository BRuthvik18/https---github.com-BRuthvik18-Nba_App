import { Injectable } from '@angular/core';
import { TeamData } from '../Models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  matchStats: any = [];
  // filteredGames: any = [];
  public teams: TeamData[] = [];

  constructor() {}
  gameResults(data: any) {
    this.matchStats = data;
  }
}
