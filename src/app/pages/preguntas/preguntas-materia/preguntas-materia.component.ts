import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { MateriaService } from '../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from '../../../models/pregunta.model';
import { Materia } from '../../../models/materia.model';

@Component({
  selector: 'app-preguntas-materia',
  templateUrl: './preguntas-materia.component.html',
  styles: ``
})
export class PreguntasMateriaComponent implements OnInit {

  preguntas: Pregunta[] = [];
  totalRegistros: number = 0;
  p: number = 1;

  cargando: boolean = true;
  materia_id: number = 0;
  materia!: Materia;

  constructor(
    public activateRoute: ActivatedRoute,
    public _materiaService: MateriaService,
    private toastr: ToastrService
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargando = false;
      this.materia_id = id;
      this.cargarPreguntas(id);
    })
  }

  ngOnInit(): void {

  }

  cargarPreguntas(id: number) {
    this.cargando = true;

    this._materiaService.cargarPreguntas(id)
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
        this.preguntas = resp.preguntas;
        this.materia = resp.materia;
        this.cargando = false;
      })
  }

  estadoPregunta(pregunta: Pregunta) {
    
    let mensaje = '';
    let mensaje2 = '';
    if (pregunta.estado === 1) {
      mensaje = 'Está a punto de eliminar la pregunta: ';
      mensaje2 = 'Pregunta eliminada correctamente ';
    } else {
      mensaje = 'Está a punto de activar pregunta';
      mensaje2 = 'Pregunta activada correctamente ';
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
        this._materiaService.borrarPregunta(pregunta.id.toString(), pregunta.estado!)
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
            (preg: Pregunta) => {
              pregunta.estado = preg.estado;
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

  buscarPregunta(termino: string) {
    this.cargando = true;
    this._materiaService.buscarPregunta(termino, this.materia_id)
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
      .subscribe((preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
        this.cargando = false;
      })
  }



}
