import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchStatsComponent } from './team-list/match-stats/match-stats.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams',
    pathMatch: 'full',
  },
  {
    path: 'teams',
    component: TeamListComponent,
    pathMatch: 'full',
  },
  {
    path: 'results/:teamCode',
    component: MatchStatsComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'teams',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
