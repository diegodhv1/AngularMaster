import { Injectable } from '@angular/core';
import { Menu } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [{
    title: 'Main',
    icon: 'mdi mdi-gauge ',
    subMenu: [
      { url: '/dashboard', title: 'Dashboard'},
      { url: '/progress', title: 'Progress'},
      { url: '/grafics', title: 'Grafics'},
      { url: '/promises', title: 'Promise'},
      { url: '/rxjs', title: 'Rxjs'}
    ]
  }];

  constructor() { }
}
