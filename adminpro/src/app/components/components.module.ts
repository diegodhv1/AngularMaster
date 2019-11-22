import { NgModule } from '@angular/core';

// ng-2 charts
import { ChartsModule } from 'ng2-charts';

// Components
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';



@NgModule({

    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent,
        CounterComponent
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent,
        CounterComponent
    ],
    imports: [
        ChartsModule,
        FormsModule
    ]

})

export class GenericComponentsModules{}