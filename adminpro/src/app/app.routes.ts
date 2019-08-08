import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NopagesfoundComponent } from './shared/nopagesfound/nopagesfound.component';
import { RegisterComponent } from './login/register/register.component';


const appRoutes: Routes = [
    // {
    //     path: '', component: PagesComponent,
    //     children: [
    //         { path: 'dashboard', component: DashboardComponent },
    //         { path: 'progress', component: ProgressComponent },
    //         { path: 'graficas1', component: Graficas1Component },
    //         {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    //     ]
    // },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagesfoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });