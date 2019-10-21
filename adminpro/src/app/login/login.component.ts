import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// De esta forma se ejectua una función de alún plugin en Javascript
// se está ejecutando custom.js para cargar el plugin del template (menu, sidebar, etc.)

declare function init_custom();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_custom();
  }

  login() {
    this.router.navigate(['/dashboard']);
  }

}
