import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';


@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagesfoundComponent 
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagesfoundComponent
    ]
})

export class SharedModule{}