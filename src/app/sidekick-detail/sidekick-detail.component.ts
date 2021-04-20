import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Sidekick } from '../sidekick';
import { HeroService } from '../hero.service';
import { Store } from '@ngrx/store';
import { increment, decrement, setState} from '../like-counter.actions';

@Component({
  selector: 'app-sidekick-detail',
  templateUrl: './sidekick-detail.component.html',
  styleUrls: ['./sidekick-detail.component.css']
})
export class SidekickDetailComponent implements OnInit {
  sidekick: Sidekick | null = null;
  likes$: any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<{ name: {
      likes: number}}>
  ) { this.likes$ = this.store.source }

  ngOnInit(): void {
    this.getSidekick();
  }
  
  getSidekick(): void {
    var id = this.route.snapshot.paramMap.get('id')!;
    this.heroService.getSidekick(id)
      .subscribe(sidekick => {
        this.sidekick = sidekick;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.sidekick) { 
      this.sidekick.likes = this.likes$._value.hero.name.likes;
      this.heroService.updateSidekick(this.sidekick)
      .subscribe(() => this.goBack());
    }
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  setState() {
    //if there is a hero it takes the hero observable that was taken form the api and sends it to the state this keeps the number of likes the same through out users/sessions.
    if(this.sidekick) {
      const sidekick = this.sidekick
      this.store.dispatch(setState(sidekick));
    }
  }
}
