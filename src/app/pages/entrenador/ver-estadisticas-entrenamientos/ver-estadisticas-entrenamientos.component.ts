import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService, UsuarioService } from '../../../services/service.index';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-estadisticas-entrenamientos',
  templateUrl: './ver-estadisticas-entrenamientos.component.html',
  styleUrl: './ver-estadisticas-entrenamientos.component.css'
})
export class VerEstadisticasEntrenamientosComponent {

  cargando: boolean = true;
  isQuizCompleto: boolean = false;
  puntaje: number = 0;
  suma: number = 0;
  numpre: number = 5;
  preguntas: any[] = [];
  materia: string = '';
  entrenamiento_id: number = 0;
  user_id: number = 0;
  materia_id: number = 0;
  entrenamiento!: any;
  user!: Usuario;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public activateRoute: ActivatedRoute,
    public _generalService: GeneralService
  ) {
    this.closeSidebar();

    activateRoute.params.subscribe(params => {
      this.numpre = 5;
      this.isQuizCompleto = false;
      this.cargando = false;
      this.entrenamiento_id = params['entrenamiento_id'];
      this.user_id = params['user_id'];
      this.materia_id = params['materia_id'];

      this.verificarPreguntaEntrenamiento();
    });

  }

  ngOnDestroy(): void {
    // Quitar el atributo cuando el componente se destruye
    document.body.removeAttribute('data-kt-app-sidebar-minimize');
  }

  closeSidebar() {
    const bodyTag = document.body;
    bodyTag.setAttribute('data-kt-app-sidebar-minimize', 'on');
  }


  verificarPreguntaEntrenamiento() {
    this.cargando = true;
    this._generalService.verificarPreguntaEntrenamiento(this.entrenamiento_id, this.user_id, this.materia_id)
      .pipe(
        catchError(error => {
          this.cargando = false;
          if (error.error.errors) {
            this.mostrarError(error.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: error.error.error,
              icon: "error"
            });
          }
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {
        this.cargando = false;
        this.isQuizCompleto = true;
        this.preguntas = resp.preguntas;
        console.log(this.preguntas);
        this.materia = resp.materia;
        this.entrenamiento = resp.entrenamiento;
        this.puntaje = this.entrenamiento.puntaje;
        this.numpre = this.entrenamiento.correctas + this.entrenamiento.incorrectas;
        this.suma = this.entrenamiento.correctas;

        this.user = resp.user;
      });
  }

  mostrarError(errors: any) {
    let errorMessage = '';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorMessage += `${key}: ${errors[key]}<br>`;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: errorMessage
    });
  }

  preguntaCor(correcta: number, i: number) {
    let corre: string = 'ans' + correcta;
    if (corre === 'ans1') {
      return this.preguntas[i].ans1;
    } else {
      if (corre === 'ans2') {
        return this.preguntas[i].ans2;
      } else {
        if (corre === 'ans3') {
          return this.preguntas[i].ans3;
        } else {
          return this.preguntas[i].ans4;
        }
      }
    }
  }

  banderaCor(correcta: number, i: number) {
    let corre: string = 'ans' + correcta;
    if (corre === 'ans1') {
      return this.preguntas[i].ban_imgr1;
    } else {
      if (corre === 'ans2') {
        return this.preguntas[i].ban_imgr2;
      } else {
        if (corre === 'ans3') {
          return this.preguntas[i].ban_imgr3;
        } else {
          return this.preguntas[i].ban_imgr4;
        }
      }
    }
  }

  imagenCor(correcta: number, i: number) {
    let corre: string = 'ans' + correcta;
    if (corre === 'ans1') {
      return this.preguntas[i].imgr1;
    } else {
      if (corre === 'ans2') {
        return this.preguntas[i].imgr2;
      } else {
        if (corre === 'ans3') {
          return this.preguntas[i].imgr3;
        } else {
          return this.preguntas[i].imgr4;
        }
      }
    }
  }

  idsCor(correcta: number, i: number) {
    return this.preguntas[i].id;
  }

  preguntaSel(seleccionada: string, i: number) {
    let dividida = seleccionada.split('_');
    if (dividida[1] === 'ans1') {
      return this.preguntas[i].ans1;
    } else {
      if (dividida[1] === 'ans2') {
        return this.preguntas[i].ans2;
      } else {
        if (dividida[1] === 'ans3') {
          return this.preguntas[i].ans3;
        } else {
          return this.preguntas[i].ans4;
        }
      }
    }
  }

  banderaSel(seleccionada: string, i: number) {
    let dividida = seleccionada.split('_');
    if (dividida[1] === 'ans1') {
      return this.preguntas[i].ban_imgr1;
    } else {
      if (dividida[1] === 'ans2') {
        return this.preguntas[i].ban_imgr2;
      } else {
        if (dividida[1] === 'ans3') {
          return this.preguntas[i].ban_imgr3;
        } else {
          return this.preguntas[i].ban_imgr4;
        }
      }
    }
  }

  imagenSel(seleccionada: string, i: number) {
    let dividida = seleccionada.split('_');
    if (dividida[1] === 'ans1') {
      return this.preguntas[i].imgr1;
    } else {
      if (dividida[1] === 'ans2') {
        return this.preguntas[i].imgr2;
      } else {
        if (dividida[1] === 'ans3') {
          return this.preguntas[i].imgr3;
        } else {
          return this.preguntas[i].imgr4;
        }
      }
    }
  }

  idsSel(seleccionada: string, i: number) {
    return this.preguntas[i].id;
  }

  condicion(seleccionada: string, correcta: number, i: number) {
    let corre: string = 'ans' + correcta;
    let dividida = seleccionada.split('_');

    if (corre === (dividida[1])) {
      return true;
    } else {
      return false;
    }
  }

}
