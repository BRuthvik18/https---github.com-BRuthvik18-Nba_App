import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamData } from '../Models/teams.model';
import { SupportService } from '../services/support.service';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit {
  selectedValue!: TeamData;
  teams: TeamData[] = [];
  teamDetails: TeamData[] = [];
  constructor(
    private TeamsService: TeamsService,
    private router: Router,
    private service: SupportService
  ) {}

  ngOnInit(): void {
    this.TeamsService.getAllTeamData().subscribe(
      (data: TeamData[]) => {
        this.teams = data;

        if (this.teamDetails.length == 0) {
          this.teamDetails = this.service.teams;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  flag: boolean = true;
  public filterValue(id: number) {
    if (id != null) {
      this.flag = true;
      for (let i = 0; i < this.teamDetails.length; i++) {
        if (this.selectedValue.id == this.teamDetails[i].id) {
          this.flag = false;
        }
      }
    }
  }

  onSelectTeam() {
    this.filterValue(this.selectedValue.id);
    if (this.flag) {
      this.teamDetails.push(this.selectedValue);
      this.flag = true;
      this.service.teams = this.teamDetails;
    }
  }

  deleteElement(id: number) {
    if (id != null) {
      for (let i = 0; i < this.teamDetails.length; i++) {
        if (id == this.teamDetails[i].id) {
          this.teamDetails.splice(i, 1);
        }
      }
      this.service.teams = this.teamDetails;
    }
  }
}
