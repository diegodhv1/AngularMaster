import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainpageComponent } from './pages/mainpage.component';
import { AboutComponent } from './pages/about.component';
import { Home2Component } from './pages/home/home2.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainpageComponent,
    AboutComponent,
    Home2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
