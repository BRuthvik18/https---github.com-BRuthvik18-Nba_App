import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/Models/result.model';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css'],
})
export class MatchStatsComponent implements OnInit {
  public team: Result = new Result();
  public tempA: Result = new Result();
  public tempB: Result = new Result();
  public countA: number = 0;
  public countB: number = 0;
  public matchStats: any = [];
  constructor(private result: SupportService, private router: Router) {}

  ngOnInit(): void {
    this.matchStats = this.result.matchStats;
    this.getTeamName();
    if (this.matchStats.length == 0) {
      this.router.navigate(['/teams']);
    }
  }

  back() {
    this.router.navigate(['/teams']);
  }

  getTeamName() {
    for (let i = 0; i < this.matchStats.length; i++) {
      for (let j = i + 1; j < this.matchStats.length; j++) {
        if (
          this.matchStats[i].match.home_team.full_name ==
          this.matchStats[j].match.home_team.full_name
        ) {
          this.countA = this.countA + 1;

          this.tempA.name = this.matchStats[i].match.home_team.full_name;
          this.tempA.abbr = this.matchStats[i].match.home_team.abbreviation;
          this.tempA.conf = this.matchStats[i].match.home_team.conference;
        }
        if (
          this.matchStats[i].match.visitor_team.full_name ==
          this.matchStats[j].match.visitor_team.full_name
        ) {
          this.countB = this.countB + 1;
          this.tempB.name = this.matchStats[i].match.visitor_team.full_name;
          this.tempB.abbr = this.matchStats[i].match.visitor_team.abbreviation;
          this.tempB.conf = this.matchStats[i].match.visitor_team.conference;
        }
      }
    }
    if (this.countA > this.countB) {
      this.team.name = this.tempA.name;
      this.team.abbr = this.tempA.abbr;
      this.team.conf = this.tempA.conf;
    } else {
      this.team.name = this.tempB.name;
      this.team.abbr = this.tempB.abbr;
      this.team.conf = this.tempB.conf;
    }
  }
}
