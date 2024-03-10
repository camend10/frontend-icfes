import { NgModule } from "@angular/core";

// Rutas
import { PAGES_ROUTES } from "./pages.routes";

// Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";

// ng2-chart
import { NgChartsModule } from 'ng2-charts';

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { ProgressComponent } from "./progress/progress.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// Pipe Modulo
import { PipesModule } from "../pipes/pipes.module";
import { PerfilComponent } from './perfil/perfil.component';
import { CommonModule } from "@angular/common";

// Modulos
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";
//Paginacion
import {NgxPaginationModule} from 'ngx-pagination';
import { UsuarioComponent } from './usuarios/usuario.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        PromesasComponent,
        RxjsComponent,
        UsuariosComponent,
        PerfilComponent,
        ModalUploadComponent,
        UsuarioComponent
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