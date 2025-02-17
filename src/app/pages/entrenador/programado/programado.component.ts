import { Component, OnInit } from '@angular/core';
import { Materia } from '../../../models/materia.model';
import { MateriaService } from '../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programado',
  templateUrl: './programado.component.html',
  styleUrl: './programado.component.css'
})
export class ProgramadoComponent implements OnInit {

  materias: Materia[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _materiaService: MateriaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.cargando = true;

    this._materiaService.cargarMaterias()
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
        this.materias = resp.materias;
        this.cargando = false;
      })
  }
}
