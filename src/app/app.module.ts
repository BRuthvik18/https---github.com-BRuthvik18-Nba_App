import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamListComponent } from './team-list/team-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeamDetailsComponent } from './team-list/team-details/team-details.component';
import { MatchStatsComponent } from './team-list/match-stats/match-stats.component';
// import { FakeEnvironment } from './services/fake-environment';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    TeamDetailsComponent,
    MatchStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    MatTooltipModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
