import { Component } from '@angular/core';
import { Pregunta } from '../../../models/pregunta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaService, PreguntaService, UsuarioService } from '../../../services/service.index';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-pregunta',
  templateUrl: './ver-pregunta.component.html',
  styles: ``
})
export class VerPreguntaComponent {

  pregunta: Pregunta = new Pregunta(0, 0, '', '', '', '', '', 0, 0, 0);

  cargando: boolean = true;
  pregunta_id: number = 0;
  materia_id: number = 0;
  materia: string = '';

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public activateRoute: ActivatedRoute,
    private _preguntaService: PreguntaService,
    public _materiaService: MateriaService
  ) {
    activateRoute.params.subscribe(params => {
      let materia_id = params['materia_id'];
      let id = params['id'];
      this.cargando = false;
      this.materia_id = materia_id;

      this.pregunta_id = id;
      this.cargarPregunta(id);

    })
  }

  cargarPregunta(id: string) {
    this.cargando = true;
    this._materiaService.cargarPregunta(id)
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          this.router.navigate(['/preguntas-materias', this.materia_id]);
          return EMPTY;
        })
      )
      .subscribe((pregunta: Pregunta) => {
        this.cargando = false;
        this.pregunta = pregunta;        
      });
  }

}
