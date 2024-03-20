import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubirArchivoService, UsuarioService } from '../service.index';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(
    public http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    public _subirArchivoService: SubirArchivoService,
    public _usuariosService: UsuarioService
  ) { }

  cargarMaterias = () => {
    let url = URL_SERVICIOS + '/materias';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data);
  }

  cargarPreguntas(id: number) {
    let url = URL_SERVICIOS + '/materias/preguntas-materia';

    let data = {
      txtbusqueda: '',
      id: id
    };

    return this.http.post(url, data);
  }

  buscarPregunta(termino: string,id:number) {
    let url = URL_SERVICIOS + '/materias/preguntas-materia';

    let data = {
      txtbusqueda: termino,
      id: id
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.preguntas)
      );
  }
  
  borrarPregunta(id: string, estado: number) {
    let url = URL_SERVICIOS + '/materias/estado';

    let data = {
      id: id,
      estado: estado
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          return resp.pregunta;
        })
      );
  }

  cargarPregunta(id: string) {
    let url = URL_SERVICIOS + '/materias/by-id';

    let data = {
      id: id
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          return resp.pregunta;
        })
      );
  }
}
