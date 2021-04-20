import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { SidekicksComponent } from './sidekicks/sidekicks.component';
import { SidekickDetailComponent } from './sidekick-detail/sidekick-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'sidekick/:id', component: SidekickDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'sidekicks', component: SidekicksComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
