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

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild(routes);