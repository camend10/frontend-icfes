import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';
import { Observable, of, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token!: string;
  edad: number = 0;
  menu: any = [];

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
      const dato2 = localStorage.getItem('menu');
      if (dato2) {
        this.menu = JSON.parse(dato2);
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
        role_id: 0,
        grado_id: 0,
        tipo: ''
      };
      this.edad = 0;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, edad: number, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('edad', edad.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.edad = edad;
    this.menu = menu;

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
      role_id: 0,
      grado_id: 0,
      tipo: ''
    };
    this.edad = 0;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('edad');
    localStorage.removeItem('menu');
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
          this.guardarStorage(resp.id, resp.token, resp.user, resp.edad, resp.menu);

          this.toastr.success('Inicio de sesión exitoso', 'Iniciando sesión', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
        }),
        catchError(err => {
          if (err.error.errors) {
            this.mostrarError(err.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: err.error.error,
              icon: "error"
            });
          }
          return throwError(() => err);
        })

      );
  }

  guardarUsuario(usuario: Usuario) {

    if (usuario.id) {
      // actualizando
      let url = URL_SERVICIOS + '/users/modify/' + usuario.id;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      return this.http.put(url, usuario, { headers })
        .pipe(
          map((resp: any) => {

            this.toastr.success('Usuario modificado ' + usuario.name + ' de manera exitosa', '!Exitoso', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
            return resp.user;
          }),
          catchError(err => {
            this.mostrarError(err.error.errors);
            return throwError(() => err);
          })
        )

    } else {

      // creando
      let url = URL_SERVICIOS + '/users/create';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      return this.http.post(url, usuario, { headers })
        .pipe(
          map((resp: any) => {

            this.toastr.success('Usuario creado ' + usuario.name + ' de manera exitosa', '!Exitoso', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
            return resp.user;
          }),
          catchError(err => {
            this.mostrarError(err.error.errors);
            return throwError(() => err);
          })
        )
    }

  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/users/update/' + usuario.id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, usuario, { headers })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.user.id, this.token, resp.user, resp.edad, this.menu);

          this.toastr.success('Perfil actualizado', '!Exitoso', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });

          return true;

        }),
        catchError(err => {
          this.mostrarError(err.error.errors);
          return throwError(() => err);
        })
      )
  }

  cambiarImagen(file: File, id: number) {

    this._subirArchivoService.subirArchivo(file, "foto", id, this.usuario.tipo, this.token)
      .then((resp: any) => {

        this.usuario.foto = resp.user.foto;
        this.guardarStorage(resp.user.id, this.token, resp.user, this.edad, this.menu);
        this.toastr.success('Foto actualizada', this.usuario.name, {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
        window.location.reload();
      })
      .catch(err => {
        if (err.error.errors) {
          this.mostrarError(err.error.errors);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Ocurrió un error en la operación",
            icon: "error"
          });
        }
        return throwError(() => err);
      });


  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/users';

    let data = {
      txtbusqueda: ''
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers: headers })
      .pipe(
        catchError(err => {
          if (err.error.errors) {
            this.mostrarError(err.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Ocurrió un error en la operación",
              icon: "error"
            });
          }
          return throwError(() => err);
        })
      );
  }

  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + '/users';

    let data = {
      txtbusqueda: termino
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers: headers })
      .pipe(
        map((resp: any) => resp.users),
        catchError(err => {
          if (err.error.errors) {
            this.mostrarError(err.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Ocurrió un error en la operación",
              icon: "error"
            });
          }
          return throwError(() => err);
        })
      );
  }

  borrarUsuario(id: string, estado: number, mensaje: string) {
    let url = URL_SERVICIOS + '/users/estado';

    let data = {
      id: id,
      estado: estado
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers: headers })
      .pipe(
        map((resp: any) => {

          this.toastr.success(mensaje, this.usuario.name, {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
          return resp.user;
        }),
        catchError(err => {
          if (err.error.errors) {
            this.mostrarError(err.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Ocurrió un error en la operación",
              icon: "error"
            });
          }
          return throwError(() => err);
        })
      );
  }

  resetearClave(usuario: Usuario) {
    let url = URL_SERVICIOS + '/users/resetear';

    let data = {
      id: usuario.id
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers: headers })
      .pipe(
        map((resp: any) => {

          this.toastr.success(resp.mensaje, this.usuario.name, {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
          return resp.user;
        }),
        catchError(err => {
          if (err.error.errors) {
            this.mostrarError(err.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Ocurrió un error en la operación",
              icon: "error"
            });
          }
          return throwError(() => err);
        })
      );
  }

  cargarUsuario(id: string) {
    let url = URL_SERVICIOS + '/users/by-id';

    let data = {
      id: id
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers: headers })
      .pipe(
        map((resp: any) => {
          return resp.user;
        }),
        catchError(err => {
          if (err.error.errors) {
            this.mostrarError(err.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Ocurrió un error en la operación",
              icon: "error"
            });
          }
          return throwError(() => err);
        })
      );
  }

  cambiarClave(id: string, password: string, newpassword: string, confirmpassword: string) {
    let url = URL_SERVICIOS + '/users/cambiar';

    let data = {
      id: id,
      password: password,
      newpassword: newpassword,
      confirmpassword: confirmpassword
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers: headers })
      .pipe(
        map((resp: any) => {
          this.toastr.success(resp.mensaje, "Cambiar clave", {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
          return resp.ok;
        }),
        catchError(err => {
          if (err.error.error) {
            this.mostrarError(err.error.error);
          } else {
            Swal.fire({
              title: "Error!",
              text: err.error.error,
              icon: "error"
            });
          }
          return throwError(() => err);
        })
      );
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/users/refresh';

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    let data = {
      id: 0
    };

    return this.http.post(url, data, { headers: headers })
      .pipe(
        map((resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log("token renovado");
          return true;
        }),
        catchError(err => {

          Swal.fire({
            title: "Error!",
            text: "No fué posible renovar el token",
            icon: "error"
          });

          this.router.navigate(['/login']);
          return throwError(() => err);
        })
      );
  }

  expirado(fechaExp: number) {

    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }

  }

  verificaRenueva(fechaExp: number): Promise<boolean> {

    return new Promise((resolve, reject) => {


      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));


      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.renuevaToken()
          .subscribe({
            next: () => {
              resolve(true);
            },
            error: (err) => {
              reject(false);
              this.router.navigate(['/login']);
            }
          });
      }

      resolve(true);

    });

  }

  mostrarError(errors: any) {
    let errorMessage = '';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorMessage += `${key}: ${errors[key]}<br>`;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: errorMessage
    });
  }

}
