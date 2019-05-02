import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainpageComponent } from './pages/mainpage.component';
import { AboutComponent } from './pages/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainpageComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
