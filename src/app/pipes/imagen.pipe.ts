import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from '../config/config';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, id: string, tipo: string): any {

    let url = URL_IMAGENES + "/imagenes/foto";

    if (imagen == 'xxxxx' || imagen == null || imagen == '') {
      return URL_IMAGENES + "/imagenes/foto/default.png";
    }

    switch (tipo) {
      case 'tipo_usuario':
        url += `/Usuario/${id}/` + imagen;
        break;
      case 'tipo_docente':
        url += `/Docente/${id}/` + imagen;
        break;
      case 'tipo_estudiante':
        url += `/Estudiante/${id}/` + imagen;
        break;
      case 'tipo_admin':
        url += `/Admin/${id}/` + imagen;
        break;
      default:
        url += "/imagenes/foto/default.png";
    }

    return url;
  }

}
