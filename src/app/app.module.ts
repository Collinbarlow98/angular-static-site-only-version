import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './like-counter.reducer';
import { SidekicksComponent } from './sidekicks/sidekicks.component';
import { SidekickDetailComponent } from './sidekick-detail/sidekick-detail.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ hero: counterReducer })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    PageNotFoundComponent,
    SidekicksComponent,
    SidekickDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
