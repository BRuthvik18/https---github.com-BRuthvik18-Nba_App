import { TeamData } from './teams.model';
export class Games {
  home_team!: TeamData;
  home_team_score!: number;
  visitor_team!: TeamData;
  visitor_team_score!: number;
  constructor() {}
}
