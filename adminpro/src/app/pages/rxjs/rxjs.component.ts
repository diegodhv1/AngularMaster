import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subscription: Subscription;

  constructor() {
    this.returnObservableFunction().pipe(
      retry(2)
    );


    this.subscription = this.returnObservableFunction().subscribe (
      numberG =>  console.log(numberG),
      error => console.log( 'Error ' + error),
      () => console.log('Terminó observable')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Finished component');
    this.subscription.unsubscribe();
  }

  returnObservableFunction(): Observable<number> {
    return new Observable((observer: Subscriber<number> ) => {
      let count = 0;
      const interval = setInterval(() => {
        count ++;
        observer.next(count);
        // if (count === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        //  }
        // if (count === 2) {
        //   clearInterval(interval);
        //   observer.error('Error');
        // }
      }, 1000);
    });
  }

}
