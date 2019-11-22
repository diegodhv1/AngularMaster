import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.recuders';
import { MultiplyAction, DivideAction, RestartAction, substract } from '../actions';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() actualizarBarraProgreso: EventEmitter<number> = new EventEmitter();

  /**
   * Hace referencia a cualquier elemento de HTML.
   * El parametro es usado para identificar el elemento desde HTML #identificador
   */
  @ViewChild('txtProgress') txtProgress: ElementRef;
  counter: number;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {

    this.store.select('counter').subscribe(counter => {
      this.counter = counter;
    });
  }

  changeValueFromButton(value: number) {

    if (this.progreso >= 100 && value > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && value < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + value;
    this.actualizarBarraProgreso.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  changeValueFromInput(newProgressValue: number) {

    if (newProgressValue >= 100) {
      this.progreso = 100;
    } else if (newProgressValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newProgressValue;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.actualizarBarraProgreso.emit(this.progreso);
  }

  multipy() {
    const multiply = new MultiplyAction(5);
    this.store.dispatch(multiply);
  }

  divide() {
    const divide = new DivideAction(5);
    this.store.dispatch(divide);
  }

  restart() {
    const action = new RestartAction();
    this.store.dispatch(action);
  }

  substract() {
    this.store.dispatch(substract({ substract: 2 }));
  }

}
