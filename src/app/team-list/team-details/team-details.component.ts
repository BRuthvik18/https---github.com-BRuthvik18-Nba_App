import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Games } from 'src/app/Models/games.model';
import { TeamData } from 'src/app/Models/teams.model';
import { SupportService } from 'src/app/services/support.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  public url: string = 'https://interstate21.com/nba-logos/';
  @Input('details') teamDetails!: any;
  @Output('delete') element: any = new EventEmitter<number>();
  stats: Games[] = [];
  matchStats: any = [{ match: null, stats: '' }];
  filterGame: Games[] = [];
  public avgPoints: number = 0;
  public avgPointFinal: number = 0;
  public avgConcededPoints: number = 0;
  public avgFinalConcededPoints: number = 0;
  constructor(
    private activatRoute: ActivatedRoute,
    private teamsService: TeamsService,
    private service: SupportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamsService.getAllTeamsStats().subscribe({
      next: (data: Games[]) => {
        this.stats = data;
        this.filteredGames();
        this.winStatsFunc();
        this.matchStats.splice(0, 1);
      },
      error: (err: any) => console.log(err),
    });
  }

  deleteTeam(id: number) {
    this.element.emit(id);
  }

  filteredGames() {
    if (this.teamDetails.id != null && this.stats.length > 0) {
      for (let i = 0; i < this.stats.length; i++) {
        if (this.teamDetails.id == this.stats[i].visitor_team.id) {
          this.filterGame.push(this.stats[i]);
        }
        if (this.teamDetails.id == this.stats[i].home_team.id) {
          this.filterGame.push(this.stats[i]);
        }
      }
    }
  }

  winStatsFunc() {
    if (this.teamDetails.id != null && this.filterGame.length > 0) {
      for (let i = 0; i < this.filterGame.length; i++) {
        if (this.teamDetails.id == this.filterGame[i].visitor_team.id) {
          this.avgPoints =
            this.avgPoints + +this.filterGame[i].visitor_team_score;
          this.avgConcededPoints =
            this.avgConcededPoints + +this.filterGame[i].home_team_score;
          if (
            this.filterGame[i].visitor_team_score >
            this.filterGame[i].home_team_score
          ) {
            this.matchStats.push({
              match: this.filterGame[i],
              stats: 'win',
            });
          } else {
            this.matchStats.push({
              match: this.filterGame[i],
              stats: 'lost',
            });
          }
        }
        if (this.teamDetails.id == this.filterGame[i].home_team.id) {
          this.avgPoints = this.avgPoints + +this.filterGame[i].home_team_score;
          this.avgConcededPoints =
            this.avgConcededPoints + +this.filterGame[i].visitor_team_score;
          if (
            this.filterGame[i].home_team_score >
            this.filterGame[i].visitor_team_score
          ) {
            this.matchStats.push({
              match: this.filterGame[i],
              stats: 'win',
            });
          } else {
            this.matchStats.push({
              match: this.filterGame[i],
              stats: 'lost',
            });
          }
        }
      }
    }
    this.avgPointsFinalCalc();
  }

  public imageUrl(): string {
    return this.url + this.teamDetails.abbreviation + '.png';
  }

  public avgPointsFinalCalc() {
    this.avgPointFinal = Math.floor(this.avgPoints / this.filterGame.length);
    this.avgFinalConcededPoints = Math.floor(
      this.avgConcededPoints / this.filterGame.length
    );
  }

  gameResults() {
    this.service.gameResults(this.matchStats);
    this.router.navigate(['/results/' + this.teamDetails.abbreviation]);
  }
}
