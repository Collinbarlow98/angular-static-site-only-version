import { Action, createReducer, on } from '@ngrx/store';
import { increment, decrement, setState} from './like-counter.actions';

export interface State {
  name: {
    likes: number
  }
}

export const initialState: State = {
  name: {
    likes: 0
  }
};

const _counterReducer = createReducer(
  initialState,
  on(setState, (state, Hero) => ({ 
    name: {
      likes: Hero.likes
    }
  })),

  on(increment, (state) => ({
    name: {
      likes: state.name.likes + 1
    }
  })),

  on(decrement, (state) => ({
    name: {
      likes: state.name.likes - 1
    }
  })), 
);

export function counterReducer(state: State | undefined, action: Action) {
  return _counterReducer(state, action);
}