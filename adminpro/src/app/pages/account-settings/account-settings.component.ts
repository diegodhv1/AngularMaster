import { Component, OnInit, ViewChild, ElementRef, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  @ViewChild('theme') idTheme: ElementRef;
  constructor(
    @Inject(DOCUMENT)  private _document,
    public _theme: SettingsService ) { }

  ngOnInit() {
    this.setCheckIcon();
  }

  changeColorTheme(theme: string, link: any) {
    this.addCheckIcon(link);
    this._theme.applyTheme( theme );
  }

  addCheckIcon(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const element of selectors) {
      element.classList.remove('working');
    }
    link.classList.add('working');
  }

  setCheckIcon() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this._theme.settingsTheme.theme;
    for (const element of selectors) {
      if ( theme === element.getAttribute('data-theme') ) {
          element.classList.add('working');
      }
    }
  }

}
