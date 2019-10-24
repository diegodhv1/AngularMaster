import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pageRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
            { path: 'grafics', component: Graficas1Component, data: {title: 'Grafics'} },
            { path: 'promises', component: PromisesComponent, data: {title: 'Promises'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Settings'} },
            { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'} },
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes)