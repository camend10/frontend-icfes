import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { LoginGuardGuard, adminGuard, verificaTokenGuard } from "../services/service.index";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuarioComponent } from "./usuarios/usuario.component";
import { CambiarComponent } from "./perfil/cambiar.component";
import { InstitucionesComponent } from "./institucion/instituciones.component";
import { InstitucionComponent } from "./institucion/institucion.component";
import { ListadoMateriasComponent } from "./preguntas/listado-materias.component";
import { PreguntasMateriaComponent } from "./preguntas/preguntas-materia/preguntas-materia.component";
import { PreguntaComponent } from './preguntas/pregunta/pregunta.component';
import { VerPreguntaComponent } from "./preguntas/ver-pregunta/ver-pregunta.component";
import { ResultadosComponent } from "./informes/resultados/resultados.component";
import { VerResultadosComponent } from "./informes/resultados/ver-resultados/ver-resultados.component";
import { EstadisticasComponent } from "./informes/estadisticas/estadisticas.component";
import { AyudaComponent } from "./dashboard/ayuda/ayuda.component";
import { PruebasComponent } from './pruebas/pruebas/pruebas.component';
import { RankingComponent } from "./entrenador/ranking/ranking.component";
import { EstadisticaComponent } from "./entrenador/estadistica/estadistica.component";
import { VerEstadisticasEntrenamientosComponent } from "./entrenador/ver-estadisticas-entrenamientos/ver-estadisticas-entrenamientos.component";
import { ComparativoComponent } from "./comparativos/comparativo/comparativo.component";
import { ProgramadoComponent } from "./entrenador/programado/programado.component";
import { GestionProgramadoComponent } from "./entrenador/programado/gestion-programado/gestion-programado.component";
import { GuardarProgramadoComponent } from "./entrenador/programado/guardar-programado/guardar-programado.component";

const routes: Routes = [

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Dashboard',
            subtitulo: '',
            volver: ''
        }

    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

    //Usuarios
    {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Perfil de usuario',
            subtitulo: 'Perfil',
            volver: 'dashboard'
        }
    },
    {
        path: 'cambiar-clave',
        component: CambiarComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Cambiar Clave',
            subtitulo: 'Cambiar clave',
            volver: 'dashboard'
        }
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Gestión de Usuarios',
            subtitulo: 'Usuarios',
            volver: 'dashboard'
        }
    },
    {
        path: 'usuario/:id',
        component: UsuarioComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Gestión de Usuario',
            subtitulo: 'Usuario',
            volver: 'usuarios'
        }
    },

    // Instituciones
    {
        path: 'instituciones',
        component: InstitucionesComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Gestión de Instituciones',
            subtitulo: 'Instituciones',
            volver: 'dashboard'
        }
    },
    {
        path: 'institucion/:id',
        component: InstitucionComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Gestión de Institución',
            subtitulo: 'Institución',
            volver: 'instituciones'
        }
    },

    // Preguntas
    {
        path: 'preguntas',
        component: ListadoMateriasComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Materias',
            subtitulo: 'materias',
            volver: 'dashboard'
        }
    },
    {
        path: 'preguntas-materias/:id',
        component: PreguntasMateriaComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Preguntas por materia',
            subtitulo: 'preguntas por materia',
            volver: 'preguntas'
        }
    },
    {
        path: 'pregunta/:id/:materia_id',
        component: PreguntaComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Pregunta',
            subtitulo: 'pregunta',
            volver: 'preguntas'
        }
    },
    {
        path: 'ver-pregunta/:id/:materia_id',
        component: VerPreguntaComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Ver pregunta',
            subtitulo: 'Ver pregunta',
            volver: 'preguntas'
        }
    },

    // Informes

    {
        path: 'informe-resultados',
        component: ResultadosComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Informes',
            subtitulo: 'Resultados',
            volver: 'dashboard'
        }
    },
    {
        path: 'ver-resultado/:simulacro_id/:user_id',
        component: VerResultadosComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Ver resultado',
            subtitulo: 'Resultado',
            volver: 'informe-resultados'
        }
    },
    {
        path: 'informe-estadisticas',
        component: EstadisticasComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Estadisticas',
            subtitulo: 'Resultados estadisticos',
            volver: 'dashboard'
        }
    },

    // Ayuda
    {
        path: 'ayuda',
        component: AyudaComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Ayuda',
            subtitulo: 'Ayuda',
            volver: 'dashboard'
        }
    },

    // Pruebas
    {
        path: 'pruebas',
        component: PruebasComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Pruebas Diagnósticas',
            subtitulo: 'pruebas diagnósticas',
            volver: 'dashboard'
        }
    },

    // Ranking
    {
        path: 'ranking',
        component: RankingComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Ranking',
            subtitulo: 'ranking',
            volver: 'dashboard'
        }
    },

    // Estadistica
    {
        path: 'estadisticas-entrenamientos',
        component: EstadisticaComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Estadisticas de los entrenamientos',
            subtitulo: 'estadisticas',
            volver: 'dashboard'
        }
    },


    // Ver estadisticas entrenamientos
    {
        path: 'ver-estadisticas-entrenamientos/:entrenamiento_id/:user_id/:materia_id',
        component: VerEstadisticasEntrenamientosComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Ver estadisticas de los entrenamientos',
            subtitulo: 'entrenamiento',
            volver: 'estadisticas-entrenamientos'
        }
    },

    // Programado
    {
        path: 'entrenamiento-programado',
        component: ProgramadoComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Entrenamiento Programado',
            subtitulo: 'Entrenamiento Programado',
            volver: 'dashboard'
        }
    },

    // Gestion Programado
    {
        path: 'gestion-programado/:id',
        component: GestionProgramadoComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Gestión entrenamiento programado',
            subtitulo: 'gestión entrenamiento programado',
            volver: 'entrenamiento-programado'
        }
    },

    // Guardar Programado
    {
        path: 'programado/:id/:materia_id',
        component: GuardarProgramadoComponent,
        canActivate: [adminGuard, verificaTokenGuard],
        data: {
            titulo: 'Guardar Programados',
            subtitulo: 'guardar programados',
            volver: 'entrenamiento-programado'
        }
    },

    // Ver comparativos
    {
        path: 'comparativo',
        component: ComparativoComponent,
        canActivate: [verificaTokenGuard],
        data: {
            titulo: 'Ver comparativos',
            subtitulo: 'comparativo',
            volver: 'dashboard'
        }
    },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild(routes);