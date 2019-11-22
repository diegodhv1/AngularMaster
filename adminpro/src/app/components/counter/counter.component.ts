import { Component } from '@angular/core';
import * as fromCounter from '../actions';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.recuders';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html'
})

export class CounterComponent {

    constructor(private store: Store<IAppState>) {
        store.select('counter').subscribe((counter) => {
            this.counter = counter;
        });
    }

    title = 'Counter';
    counter = 0;

    increment() {
        const action = new fromCounter.IncrementAction();
        this.store.dispatch(action);
    }

    decrement() {
        const action = new fromCounter.DecrementAction();
        this.store.dispatch(action);
    }
}
