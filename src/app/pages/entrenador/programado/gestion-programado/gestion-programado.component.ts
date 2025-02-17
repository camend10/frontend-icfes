import { Component, OnInit } from '@angular/core';
import { Materia } from '../../../../models/materia.model';
import { ActivatedRoute } from '@angular/router';
import { GeneralService, MateriaService } from '../../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Programado } from '../../../../models/programado.model';
import { ProgramadoService } from '../../../../services/programados/programado.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-gestion-programado',
  templateUrl: './gestion-programado.component.html',
  styleUrl: './gestion-programado.component.css'
})
export class GestionProgramadoComponent implements OnInit {

  programados: Programado[] = [];
  programadosFiltrados: Programado[] = [];
  totalRegistros: number = 0;
  p: number = 1;

  cargando: boolean = true;
  materia_id: number = 0;
  materia!: Materia;
  docente_id: number = 9999999;
  docentes: Usuario[] = [];

  constructor(
    public activateRoute: ActivatedRoute,
    public _programadoService: ProgramadoService,
    private toastr: ToastrService,
    private _generalService: GeneralService,
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargando = false;
      this.materia_id = id;
      this.cargar(id);
    })
  }

  ngOnInit(): void {
    this.cargarDocentes();
    this.filtrarProgramados();
  }

  cargar(id: number) {
    this.cargando = true;

    this._programadoService.cargarProgramados(id)
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
        this.totalRegistros = resp.total;
        this.programados = resp.programados;
        this.materia = resp.materia;
        this.cargando = false;
        this.filtrarProgramados();
      })
  }

  buscar(termino: string) {
    this.cargando = true;
    this._programadoService.buscarProgramado(termino, this.materia_id)
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
      .subscribe((programados: Programado[]) => {
        this.programados = programados;
        this.cargando = false;
        this.filtrarProgramados();
      })
  }

  estado(programado: Programado) {

    let mensaje = '';
    let mensaje2 = '';
    if (programado.estado === 1) {
      mensaje = 'Está a punto de eliminar este programado: ';
      mensaje2 = 'Entrenamiento programado eliminado correctamente ';
    } else {
      mensaje = 'Está a punto de activar este programado';
      mensaje2 = 'Entrenamiento programado activado correctamente ';
    }

    Swal.fire({
      title: "¿Está seguro?",
      text: mensaje,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {

      if (result.isConfirmed) {
        this._programadoService.borrar(programado.id.toString(), programado.estado!)
          .pipe(
            catchError(error => {
              Swal.fire({
                title: "Error!",
                text: error.error.error,
                icon: "error"
              });
              return EMPTY;
            })
          )
          .subscribe(
            (preg: Programado) => {
              programado.estado = preg.estado;
              this.toastr.success(mensaje2, 'Notificación', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                closeButton: true
              });
            }
          );
      }
    });
  }

  cargarDocentes() {
    this.cargando = true;

    this._generalService.cargarDocentes()
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
        this.docentes = resp.docentes;
        this.cargando = false;
      })
  }

  filtrarProgramados() {
    if (this.docente_id === 9999999) {
      // Si no se selecciona ningún docente, muestra todos los programados
      this.programadosFiltrados = this.programados;
    } else {
      // Filtra los programados por el user_id seleccionado
      this.programadosFiltrados = this.programados.filter(programado => programado.user_id === this.docente_id);
    }
  }
}
