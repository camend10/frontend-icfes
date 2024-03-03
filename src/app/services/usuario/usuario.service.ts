import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token!: string;
  edad: number = 0;

  constructor(

    public http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    public _subirArchivoService: SubirArchivoService

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
      this.edad = Number(localStorage.getItem('edad'));
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
      this.edad = 0;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, edad: number) {
    localStorage.setItem('id', id);
    localStorage.setItem('edad', edad.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
    this.edad = edad;

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
    this.edad = 0;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('edad');
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

          this.guardarStorage(resp.id, resp.token, resp.user, resp.edad);
          return true;

        })
      );
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/users/update/' + usuario.id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, usuario, { headers })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.user.id, this.token, resp.user, resp.edad);

          this.toastr.success('Perfil actualizado', '!Exitoso', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });

          return true;

        })
      )
  }

  cambiarImagen(file: File, id: number) {

    this._subirArchivoService.subirArchivo(file, "foto", id, this.usuario.tipo, this.token)
      .then((resp: any) => {

        this.usuario.foto = resp.user.foto;
        this.guardarStorage(resp.user.id, this.token, resp.user, this.edad);
        this.toastr.success('Foto actualizada', this.usuario.name, {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
        window.location.reload();
      })
      .catch(resp => {
        console.log(resp);
      });


  }


}
