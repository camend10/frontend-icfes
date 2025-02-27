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
import { ResultadosComponent } from './informes/resultados/resultados.component';
import { VerResultadosComponent } from './informes/resultados/ver-resultados/ver-resultados.component';
import { EstadisticasComponent } from './informes/estadisticas/estadisticas.component';
import { AyudaComponent } from './dashboard/ayuda/ayuda.component';
import { PruebasComponent } from './pruebas/pruebas/pruebas.component';
import { RankingComponent } from './entrenador/ranking/ranking.component';
import { EstadisticaComponent } from './entrenador/estadistica/estadistica.component';
import { VerEstadisticasEntrenamientosComponent } from './entrenador/ver-estadisticas-entrenamientos/ver-estadisticas-entrenamientos.component';
import { ComparativoComponent } from './comparativos/comparativo/comparativo.component';
import { GraficoComponent } from './comparativos/grafico/grafico.component';
import { ProgramadoComponent } from './entrenador/programado/programado.component';
import { GestionProgramadoComponent } from './entrenador/programado/gestion-programado/gestion-programado.component';
import { GuardarProgramadoComponent } from './entrenador/programado/guardar-programado/guardar-programado.component';
import { VerPreguntaModalComponent } from './entrenador/programado/ver-pregunta-modal/ver-pregunta-modal.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


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
        VerPreguntaComponent,
        ResultadosComponent,
        VerResultadosComponent,
        EstadisticasComponent,
        AyudaComponent,
        PruebasComponent,
        RankingComponent,
        EstadisticaComponent,
        VerEstadisticasEntrenamientosComponent,
        ComparativoComponent,
        GraficoComponent,
        ProgramadoComponent,
        GestionProgramadoComponent,
        GuardarProgramadoComponent,
        VerPreguntaModalComponent
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
        FlatpickrModule.forRoot({ locale: Spanish }),
        NgbModule
    ]
})


export class PagesModule { }