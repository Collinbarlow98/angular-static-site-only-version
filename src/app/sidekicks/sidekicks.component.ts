import { Component, OnInit } from '@angular/core';

import { Sidekick } from '../sidekick';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-sidekicks',
  templateUrl: './sidekicks.component.html',
  styleUrls: ['./sidekicks.component.css']
})
export class SidekicksComponent implements OnInit {
  sidekicks: Sidekick[] = [];

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getSidekicks();
  }

  getSidekicks(): void {
    this.heroService.getSidekicks()
    .subscribe(sidekicks => this.sidekicks = sidekicks);
  }

}
