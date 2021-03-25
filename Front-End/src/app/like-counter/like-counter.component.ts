import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement} from '../like-counter.actions';

@Component({
  selector: 'app-like-counter',
  templateUrl: './like-counter.component.html',
  styleUrls: ['./like-counter.component.css']
})
export class LikeCounterComponent {
  likes$: Observable<number>;

  constructor(private store: Store<{ likes: number }>) {
    this.likes$ = store.select('likes');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

}
