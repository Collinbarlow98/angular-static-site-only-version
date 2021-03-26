import { createAction, props } from '@ngrx/store';
import { Hero } from './hero'

export const increment = createAction('[Hero-Detail Component] Increment');
export const decrement = createAction('[Hero-Detail Component] Decrement');
export const setState = createAction('[Hero-Detail Component]', props<Hero>());