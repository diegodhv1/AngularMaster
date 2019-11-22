import { Action, props, createAction } from '@ngrx/store';

export const INCREMENT = '[Counter] INCREMENT';
export const DECREMENT = '[Counter] DECREMENT';
export const MULTIPLY = '[Counter] MULTIPLY';
export const DIVIDE = '[Counter] DIVIDE';
export const RESTART = '[Counter] RESTART';


// version from oficial web page
export const substract = createAction(
    '[Counter] substract',
    props<{ substract: number }>()
  );

export class IncrementAction implements Action {
    readonly type = INCREMENT;
}

export class DecrementAction implements Action {
    readonly type = DECREMENT;
}

export class MultiplyAction implements Action {
    readonly type = MULTIPLY;
    constructor(public payload: number) {
    }
}

export class DivideAction implements Action {
    readonly type = DIVIDE;
    constructor(public payload: number) {
    }
}

export class RestartAction implements Action {
    readonly type = RESTART;
}

export type operationsActions = IncrementAction |
    DecrementAction |
    MultiplyAction |
    RestartAction |
    DivideAction;
