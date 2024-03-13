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
        data: {
            titulo: 'Perfil de usuario',
            subtitulo: 'Perfil',
            volver: 'dashboard'
        }
    },
    {
        path: 'cambiar-clave',
        component: CambiarComponent,
        data: {
            titulo: 'Cambiar Clave',
            subtitulo: 'Cambiar clave',
            volver: 'dashboard'
        }
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [adminGuard],
        data: {
            titulo: 'Gestión de Usuarios',
            subtitulo: 'Usuarios',
            volver: 'dashboard'
        }
    },
    {
        path: 'usuario/:id',
        component: UsuarioComponent,
        canActivate: [adminGuard],
        data: {
            titulo: 'Gestión de Usuario',
            subtitulo: 'Usuario',
            volver: 'usuarios'
        }
    },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild(routes);