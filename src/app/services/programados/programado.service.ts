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
export class ProgramadoService {

  constructor(
    public http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    public _subirArchivoService: SubirArchivoService,
    public _usuariosService: UsuarioService
  ) { }

  cargarProgramados(id: number) {
    let url = URL_SERVICIOS + '/programados/programados-materia';

    let data = {
      txtbusqueda: '',
      id: id
    };

    return this.http.post(url, data);
  }

  buscarProgramado(termino: string, id: number) {
    let url = URL_SERVICIOS + '/programados/programados-materia';

    let data = {
      txtbusqueda: termino,
      id: id
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.programados)
      );
  }

  getProgramadoById(id: number) {
    let url = URL_SERVICIOS + '/programados/programados-by-id';

    let data = {
      id: id
    };

    return this.http.post(url, data);
  }

  borrar(id: string, estado: number) {
    let url = URL_SERVICIOS + '/programados/estado';

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

  guardarPreguntasProgramadas(data: {
    id: number,
    nombre: string,
    grado_id: number,
    materia_id: number,
    preguntas_ids: number[]
  }) {
    let url = URL_SERVICIOS;

    // Verificar si el ID es diferente de 0
    if (data.id && data.id !== 0) {
      url += '/programados/editar-programados';
    } else {
      url += '/programados/guardar-programados';
    }


    return this.http.post(url, data);
  }

}
