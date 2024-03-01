import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token!: string;

  constructor(

    public http: HttpClient,
    public router: Router

  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') || '';
      const dato = localStorage.getItem('usuario');
      if (dato) {
        this.usuario = JSON.parse(dato);
      }
    } else {
      this.token = '';
      this.usuario = {
        id: 0,
        tipo_doc_id: 0,
        identificacion: '',
        name: '',
        email: '',
        username: '',
        password: '',
        curso_id: 0,
        departamento_id: 0,
        municipio_id: 0,
        rol_id: 0,
        grado_id: 0,
        tipo: ''
      };
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = {
      id: 0,
      tipo_doc_id: 0,
      identificacion: '',
      name: '',
      email: '',
      username: '',
      password: '',
      curso_id: 0,
      departamento_id: 0,
      municipio_id: 0,
      rol_id: 0,
      grado_id: 0,
      tipo: ''
    };
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/auth/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {

          this.guardarStorage(resp.id, resp.token, resp.user);
          return true;

        })
      );
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/users/create';
    return this.http.post(url, usuario);
  }


}
