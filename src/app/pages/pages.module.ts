import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Rutas
import { PAGES_ROUTES } from "./pages.routes";

// Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";

// ng2-chart
import { NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { ProgressComponent } from "./progress/progress.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CambiarComponent } from './perfil/cambiar.component';

// Pipe Modulo
import { PipesModule } from "../pipes/pipes.module";

//Paginacion
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        PromesasComponent,
        RxjsComponent,
        UsuariosComponent,
        PerfilComponent,
        UsuarioComponent,
        CambiarComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        NgChartsModule,
        PipesModule,
        CommonModule,
        NgxPaginationModule
    ]
})

export class PagesModule { }