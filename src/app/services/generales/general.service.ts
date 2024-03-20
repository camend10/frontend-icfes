import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UsuarioService } from '../service.index';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService implements OnInit {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }

  cargarDepartamentos() {

    let url = URL_SERVICIOS + '/generales/departamentos';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.departamentos)
      );
  }

  cargarMunicipios() {

    let url = URL_SERVICIOS + '/generales/municipios';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.municipios)
      );
  }

  cargarTipoDocumentos() {

    let url = URL_SERVICIOS + '/generales/tipo-documentos';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.tipodocumentos)
      );
  }

  cargarGrados() {

    let url = URL_SERVICIOS + '/generales/grados';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.grados)
      );
  }

  cargarCursos() {

    let url = URL_SERVICIOS + '/generales/cursos';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.cursos)
      );
  }

  cargarSimulacros() {

    let url = URL_SERVICIOS + '/generales/simulacros';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.simulacros)
      );
  }

  cargarSesiones() {

    let url = URL_SERVICIOS + '/generales/sesiones';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.sesiones)
      );
  }

  cargarComponentes(materia_id: number) {

    let url = URL_SERVICIOS + '/generales/componentes';

    let data = {
      materia_id: materia_id,
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.componentes)
      );
  }

}
