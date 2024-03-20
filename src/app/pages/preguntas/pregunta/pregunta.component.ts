import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pregunta } from '../../../models/pregunta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService, MateriaService, PreguntaService } from '../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sesion } from '../../../models/sesion.model';
import { Simulacro } from '../../../models/simulacro.model';
import { Componente } from '../../../models/componente.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styles: ``
})
export class PreguntaComponent implements OnInit {

  forma!: FormGroup;
  pregunta: Pregunta = new Pregunta(0, 0, '', '', '', '', '', 0, 0, 0, 0, '');
  cargando: boolean = true;

  materia_id: number = 0;
  pregunta_id: number = 0;

  sesiones: Sesion[] = [];
  simulacros: Simulacro[] = [];
  componentes: Componente[] = [];

  constructor(
    public activateRoute: ActivatedRoute,
    public _materiaService: MateriaService,
    public router: Router,
    private fb: FormBuilder,
    private _generalService: GeneralService,
    private _preguntaService: PreguntaService,
    private toastr: ToastrService
  ) {
    activateRoute.params.subscribe(params => {
      let materia_id = params['materia_id'];
      let id = params['id'];
      this.cargando = false;
      this.materia_id = materia_id;

      if (id !== 'nuevo') {
        this.pregunta_id = id;
        this.cargarPregunta(id);
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.cargarSesiones();
    this.cargarSimulacros();
    this.cargarComponentes();
  }

  get f() {
    return this.forma.controls;
  }

  initForm() {
    this.forma = this.fb.group({
      id: [
        0
      ],
      test_id: [
        0
      ],
      que_desc: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ans1: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ans2: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ans3: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ans4: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      true_ans: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      img_preg: [
        ''
      ],
      imgr1: [
        ''
      ],
      imgr2: [
        ''
      ],
      imgr3: [
        ''
      ],
      imgr4: [
        ''
      ],
      sesion: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      simulacro: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      componente: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      competencia: [
        ''
      ],
      que_desc2: [
        ''
      ],
      que_desc3: [
        ''
      ],
      pre_test: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ban_img: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ban_imgr1: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ban_imgr2: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ban_imgr3: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      ban_imgr4: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
    });
  }

  onFileChanged(event: Event, fieldName: string) {
    const target = event.target as HTMLInputElement;
    const archivo: File = (target.files as FileList)[0];
    // const file = event.target.files[0];
    this.f[fieldName].setValue(archivo);
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
        this.cargarData(this.pregunta);
      });
  }

  cargarData = (pregunta: Pregunta) => {

    this.forma.reset({
      id: pregunta.id,
      test_id: pregunta.test_id,
      que_desc: pregunta.que_desc,
      ans1: pregunta.ans1,
      ans2: pregunta.ans2,
      ans3: pregunta.ans3,
      ans4: pregunta.ans4,
      true_ans: pregunta.true_ans,
      img_preg: pregunta.img_preg,
      imgr1: pregunta.imgr1,
      imgr2: pregunta.imgr2,
      imgr3: pregunta.imgr3,
      imgr4: pregunta.imgr4,
      sesion: pregunta.sesion,
      simulacro: pregunta.simulacro,
      componente: pregunta.componente,
      competencia: pregunta.competencia,
      que_desc2: pregunta.que_desc2,
      que_desc3: pregunta.que_desc3,
      pre_test: pregunta.pre_test,
      ban_img: pregunta.ban_img,
      ban_imgr1: pregunta.ban_imgr1,
      ban_imgr2: pregunta.ban_imgr2,
      ban_imgr3: pregunta.ban_imgr3,
      ban_imgr4: pregunta.ban_imgr4,
    });

    return Object.values(this.forma.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(control => control.markAsTouched());
      } else {
        control.markAsTouched();
      }
    })

  }

  cargarSesiones() {
    this._generalService.cargarSesiones()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          this.router.navigate(['/preguntas-materias', this.pregunta_id]);
          return EMPTY;
        })
      )
      .subscribe((sesiones: Sesion[]) => {
        this.sesiones = sesiones;
      })
  }

  cargarSimulacros() {
    this._generalService.cargarSimulacros()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          this.router.navigate(['/preguntas-materias', this.pregunta_id]);
          return EMPTY;
        })
      )
      .subscribe((simulacros: Simulacro[]) => {
        this.simulacros = simulacros;
      })
  }

  cargarComponentes() {
    this._generalService.cargarComponentes(this.materia_id)
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          this.router.navigate(['/preguntas-materias', this.pregunta_id]);
          return EMPTY;
        })
      )
      .subscribe((componentes: Componente[]) => {
        this.componentes = componentes;
      })
  }

  guardarPregunta() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      })
      return;
    }

    const result: any = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    
    let formData = new FormData();
    result['test_id'] = this.materia_id;

    formData.append('id', result['id']);
    formData.append('test_id', result['test_id']);
    formData.append('que_desc', result['que_desc']);
    formData.append('ans1', result['ans1']);
    formData.append('ans2', result['ans2']);
    formData.append('ans3', result['ans3']);
    formData.append('ans4', result['ans4']);
    formData.append('true_ans', result['true_ans']);
    formData.append('img_preg', result['img_preg']);
    formData.append('imgr1', result['imgr1']);
    formData.append('imgr2', result['imgr2']);
    formData.append('imgr3', result['imgr3']);
    formData.append('imgr4', result['imgr4']);
    formData.append('sesion', result['sesion']);
    formData.append('simulacro', result['simulacro']);
    formData.append('componente', result['componente']);
    formData.append('competencia', result['competencia']);
    formData.append('que_desc2', result['que_desc2']);
    formData.append('que_desc3', result['que_desc3']);
    formData.append('pre_test', result['pre_test']);
    formData.append('estado', "1");
    formData.append('user_id', "0");
    formData.append('ban_img', result['ban_img']);
    formData.append('ban_imgr1', result['ban_imgr1']);
    formData.append('ban_imgr2', result['ban_imgr2']);
    formData.append('ban_imgr3', result['ban_imgr3']);
    formData.append('ban_imgr4', result['ban_imgr4']);

    this.cargando = true;
    this._preguntaService.guardarPregunta(formData, parseInt(result['id']))
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
      .subscribe((pregunta: Pregunta) => {
        this.pregunta.id = pregunta.id;
        this.cargando = false;
        this.router.navigate(['/preguntas-materias', this.materia_id]);
      });
  }

  mostrarMensaje(mensaje1: string) {
    this.toastr.error(mensaje1, 'Validación', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true
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

}
