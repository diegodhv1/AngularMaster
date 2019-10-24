import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    // Capturar una promesa.
    this.count3().then((value) => {
      console.log('Termina ' + value);
    }).catch(error => {
      console.error('Termina con error', error);
    });

  }

  ngOnInit() {
  }

  count3() {
    // Ejemplo de uso de promesas.
    const promise = new Promise((resolve, reject) => {
      let count = 1;
      const interval = setInterval(() => {
        console.log(count);
        count += 1;
        if (count === 3) {
          resolve('OK!');
          clearInterval(interval);
        }
      }, 1000);
    });

    return promise;
  }

}
