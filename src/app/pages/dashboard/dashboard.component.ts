import { Component } from '@angular/core';
import { GeneralService } from '../../services/service.index';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  cargando: boolean = true;
  estudiantes: number = 0;
  docentes: number = 0;
  usuarios: number = 0;
  preguntas: number = 0;

  constructor(
    public _generalService: GeneralService,
    public router: Router,
  ) {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.cargando = true;
    this._generalService.cargarDashboard()
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
        this.cargando = false;
        this.estudiantes = resp.datos['estudiantes'];
        this.docentes = resp.datos['docentes'];
        this.usuarios = resp.datos['usuarios'];
        this.preguntas = resp.datos['preguntas'];
      });
  }
}
