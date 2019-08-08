import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';

//Modules
import { PageModules } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { NopagesfoundComponent } from './shared/nopagesfound/nopagesfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent     
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PageModules    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
