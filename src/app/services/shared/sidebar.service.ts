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
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Roles', url: '/login' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Progress', url: '/progress' }
      ]
    }
  ];

  constructor() { }
}
