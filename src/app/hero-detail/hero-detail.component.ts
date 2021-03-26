import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store } from '@ngrx/store';
import { increment, decrement, setState} from '../like-counter.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | null = null;
  likes$: any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<{ name: {
      likes: number}}>
  ) { this.likes$ = this.store.source }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.setState()
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) { 
      this.hero.likes = this.likes$._value.hero.name.likes;
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
  //calls the setState action
  setState() {
    //if there is a hero it takes the hero observable that was taken form the api and sends it to the state this keeps the number of likes the same through out users/sessions.
    if(this.hero) {
      const hero = this.hero
      this.store.dispatch(setState(hero));
    }
  }
}