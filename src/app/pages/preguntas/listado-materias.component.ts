import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/service.index';
import { Materia } from '../../models/materia.model';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styles: ``
})
export class ListadoMateriasComponent implements OnInit {

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
