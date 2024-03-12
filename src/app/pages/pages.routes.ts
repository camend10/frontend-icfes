import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { LoginGuardGuard, adminGuard } from "../services/service.index";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuarioComponent } from "./usuarios/usuario.component";
import { CambiarComponent } from "./perfil/cambiar.component";

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'cambiar-clave', component: CambiarComponent, data: { titulo: 'Cambiar Clave' } },

            //Usuarios
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [adminGuard],
                data: { titulo: 'Gestión de Usuarios' }
            },
            { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Gestión de Usuario' } },
            
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(routes);