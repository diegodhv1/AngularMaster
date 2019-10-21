import { Component, OnInit } from '@angular/core';

// De esta forma se ejectua una función de alún plugin en Javascript
// se está ejecutando custom.js para cargar el plugin del template (menu, sidebar, etc.)

declare function init_custom();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // llamado de archivo custom.js para cargar el plugin de la plantilla
    init_custom();
  }

}
