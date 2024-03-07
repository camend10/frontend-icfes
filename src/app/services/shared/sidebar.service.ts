import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Usuarios',
      icono: 'ki-duotone ki-profile-user',
      submenu: [
        { titulo: 'Gestion de usuarios', url: '/usuarios' },
        { titulo: 'Roles', url: '/login' },
        // { titulo: 'Graficas', url: '/graficas1' },
        // { titulo: 'Progress', url: '/progress' },
        // { titulo: 'Promesas', url: '/promesas' },
        // { titulo: 'Rxjs', url: '/rxjs' }
      ]
    }  ,
    {
      titulo: 'Preguntas',
      icono: 'ki-duotone ki-book',
      submenu: [
        { titulo: 'Gestion de preguntas', url: '/preguntas' },
      ]
    },  
    {
      titulo: 'Informes',
      icono: 'ki-duotone ki-file-added',
      submenu: [
        { titulo: 'Informe general', url: '/informe-general' },
      ]
    },  
  ];

  constructor() { }
}
