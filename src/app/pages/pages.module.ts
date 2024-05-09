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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { NgxPaginationModule } from 'ngx-pagination';
import { InstitucionesComponent } from './institucion/instituciones.component';
import { InstitucionComponent } from './institucion/institucion.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import {Spanish} from 'flatpickr/dist/l10n/es';
import { ListadoMateriasComponent } from './preguntas/listado-materias.component';
import { PreguntasMateriaComponent } from './preguntas/preguntas-materia/preguntas-materia.component';
import { PreguntaComponent } from './preguntas/pregunta/pregunta.component';
import { SimulacrosComponent } from './simulacros/simulacros/simulacros.component';
import { VerPreguntaComponent } from './preguntas/ver-pregunta/ver-pregunta.component';

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
        CambiarComponent,
        InstitucionesComponent,
        InstitucionComponent,
        ListadoMateriasComponent,
        PreguntasMateriaComponent,
        PreguntaComponent,
        SimulacrosComponent,
        VerPreguntaComponent
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
        NgxPaginationModule,
        FlatpickrModule.forRoot({ locale: Spanish })
    ]
})


export class PagesModule { }