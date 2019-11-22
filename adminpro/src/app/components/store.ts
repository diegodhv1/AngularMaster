
import * as fromCounter from './actions';


export function rootReducer(state: number = 0, action: any): number {
    switch (action.type) {
        case fromCounter.INCREMENT:
            return ++state;
        case fromCounter.DECREMENT:
            return --state;
        case fromCounter.MULTIPLY:
            return state * action.payload;
        case fromCounter.DIVIDE:
            return state / action.payload;
        case fromCounter.substract.type:
            return state - action.substract;
        case fromCounter.RESTART:
            return 0;
        default:
            return 0;
    }
}
