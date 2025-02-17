import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable, OnInit } from '@angular/core';
import { UsuarioService } from '../service.index';
import { URL_IMAGENES, URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs';
import { saveAs } from 'file-saver';
import { Simulacro } from '../../models/simulacro.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService implements OnInit {

  constructor(
    public http: HttpClient,
    private toastr: ToastrService,
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

  cargarCompetencias(materia_id: number) {

    let url = URL_SERVICIOS + '/generales/competencias';

    let data = {
      materia_id: materia_id,
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.competencias)
      );
  }

  cargarDashboard = () => {
    let url = URL_SERVICIOS + '/generales/cargar-dashboard';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data);
  }

  descargar(filename: string) {
    let url = URL_SERVICIOS + '/generales/manual-simulador';

    let data = {
      filename: filename
    };

    return this.http.post(url, data, { responseType: 'blob' })
      .pipe(
        map((response: Blob) => {
          saveAs(response, filename);
        })
      );
  }

  getVideoUrl(filename: string): string {
    let url = URL_IMAGENES + "/manuales/Videos_Administrador";
    return `${url}/${filename}`;
  }

  simulacros = () => {
    let url = URL_SERVICIOS + '/simulacros';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data);
  }

  mostrarSimulacro(id: string, mostrar: number, mensaje: string) {
    let url = URL_SERVICIOS + '/generales/mostrar';

    let data = {
      id: id,
      mostrar: mostrar
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {

          this.toastr.success(mensaje, 'Notificación', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
          return resp.simulacro;
        })
      );
  }

  cargarMaterias = () => {
    let url = URL_SERVICIOS + '/materias';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => resp.materias)
      );
  }

  cargarEntrenamientos = (materia_id: number, grado_id: number, curso_id: number, numpre: number, tipo: string) => {
    let url = URL_SERVICIOS + '/informes/ranking-estudiantes';

    let data = {
      materia_id: materia_id,
      grado_id: grado_id,
      curso_id: curso_id,
      numpre: numpre,
      tipo: tipo,
    };

    return this.http.post(url, data);
  }

  cargarEntrenamientosEstadistica = (user_id: number, materia_id: number, grado_id: number, curso_id: number, tipo: string) => {
    let url = URL_SERVICIOS + '/informes/estadisticas-entrenamientos';

    let data = {
      materia_id: materia_id,
      grado_id: grado_id,
      curso_id: curso_id,
      user_id: user_id,
      tipo: tipo,
    };

    return this.http.post(url, data);
  }

  verificarPreguntaEntrenamiento(entrenamiento_id: number, user_id: number, materia_id: number) {
    let url = URL_SERVICIOS + '/informes/ver-entrenamiento';

    let data = {
      entrenamiento_id: entrenamiento_id,
      user_id: user_id,
      materia_id: materia_id
    };

    return this.http.post(url, data);
  }

  cambioDashboard = (simulacro_id: number) => {
    let url = URL_SERVICIOS + '/generales/cambio-dashboard';

    let data = {
      simulacro_id: simulacro_id
    };

    return this.http.post(url, data);
  }

  cargarDocentes() {

    let url = URL_SERVICIOS + '/generales/docentes';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data);
  }

}
