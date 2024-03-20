import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { Pregunta } from '../../models/pregunta.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(public http: HttpClient,
    public router: Router,
    private toastr: ToastrService
  ) { }

  guardarPregunta(pregunta: FormData, id: number) {

    if (id) {
      // actualizando
      let url = URL_SERVICIOS + '/preguntas/modify';

      return this.http.post(url, pregunta)  
        .pipe(
          map((resp: any) => {
            this.toastr.success('Pregunta modificada de manera exitosa', '!Exitoso', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
            return resp.pregunta;
          })
        )

    } else {

      // creando
      let url = URL_SERVICIOS + '/preguntas/create';

      return this.http.post(url, pregunta)
        .pipe(
          map((resp: any) => {
            this.toastr.success('Pregunta creada de manera exitosa', '!Exitoso', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
            return resp.pregunta;
          })
        )
    }

  }
}
