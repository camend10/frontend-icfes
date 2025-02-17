import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { Simulacro } from '../../../models/simulacro.model';
import Swal from 'sweetalert2';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styles: ``
})
export class PruebasComponent implements OnInit {

  simulacros: Simulacro[] = [];
  totalRegistros: number = 0;
  p: number = 1;

  cargando: boolean = true;

  constructor(public _generalService: GeneralService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.cargarSimulacros();
  }

  cargarSimulacros() {

    this.cargando = true;

    this._generalService.simulacros()
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
        this.simulacros = resp.simulacros;
        this.cargando = false;
      })
  }

  simulacroSimulacro(simulacro: Simulacro) {

    let mensaje = '';
    let mensaje2 = '';
    if (simulacro.mostrar === 1) {
      mensaje = 'Está a punto de ocultar la ' + simulacro.nombre;
      mensaje2 = simulacro.nombre + ' oculta de manera correcta ';
    } else {
      mensaje = 'Está a punto de mostrar la : ' + simulacro.nombre;
      mensaje2 = simulacro.nombre + ' visible de manera correcta ';
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
        this._generalService.mostrarSimulacro(simulacro.id.toString(), simulacro.mostrar!, mensaje2)
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
            (simu: Simulacro) => {
              simulacro.mostrar = simu.mostrar;
            }
          );
      }
    });
  }
}
