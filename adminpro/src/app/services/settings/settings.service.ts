import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settingsTheme: Setting = {
    urlTheme: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT)  private _document) {
    this.loadTheme();
  }

  persistenceTheme() {
    localStorage.setItem('settingsTheme', JSON.stringify(this.settingsTheme));
  }

  loadTheme() {
    const localStorageSetting = localStorage.getItem('settingsTheme');
    if ( localStorageSetting ) {
      this.settingsTheme = JSON.parse(localStorageSetting);
      this.applyTheme( this.settingsTheme.theme );
    } else {
      this.applyTheme( this.settingsTheme.theme );
    }
  }

  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settingsTheme.theme = theme;
    this.settingsTheme.urlTheme = url;

    this.persistenceTheme();

  }
}

interface Setting {
  urlTheme: string;
  theme: string;
}
