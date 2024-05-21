import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { Curso } from '../../../models/curso.model';
import { Grado } from '../../../models/grado.model';
import { ToastrService } from 'ngx-toastr';
import { GeneralService, InformeService, InstitucionService, UsuarioService } from '../../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Simulacro } from '../../../models/simulacro.model';
import { Institucion } from '../../../models/institucion.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: ``
})
export class ResultadosComponent implements OnInit {

  usuarios: any[] = [];
  cursos: Curso[] = [];
  grados: Grado[] = [];
  simulacros: Simulacro[] = [];
  instituciones: Institucion[] = [];

  cargando: boolean = true;

  grado_id: number = 0;
  curso_id: number = 0;
  user_id: number = 0;
  simulacro_id: number = 0;
  institucion_id: number = 0;

  constructor(private toastr: ToastrService,
    public _generalService: GeneralService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _institucionService: InstitucionService,
    public _informeService: InformeService
  ) {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarGrados();
    this.cargarSimulacros();
    this.cargarInstituciones();
  }

  cargarCursos() {
    this._generalService.cargarCursos()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
      })
  }

  cargarGrados() {
    this._generalService.cargarGrados()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((grados: Grado[]) => {
        this.grados = grados;
      })
  }

  cargarSimulacros() {
    this._informeService.cargarSimulacros()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {
        this.simulacros = resp.simulacros;
      })
  }

  cargarInstituciones() {
    this._institucionService.cargarInstitucionesActivas()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((instituciones: Institucion[]) => {
        this.instituciones = instituciones;
      })
  }

  buscar() {

    if (this.institucion_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione una institución',
        icon: "error"
      });
      return;
    }

    if (this.grado_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione un grado',
        icon: "error"
      });
      return;
    }

    if (this.simulacro_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione una prueba diagnóstica',
        icon: "error"
      });
      return;
    }
    this.usuarios = [];
    this._informeService.cargarResultado(this.simulacro_id, this.grado_id, this.curso_id, this.institucion_id)
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;        
      })
  }
}
