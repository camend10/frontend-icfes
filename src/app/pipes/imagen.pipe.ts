import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from '../config/config';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(usuario: Usuario): any {

    let url = URL_IMAGENES + "/imagenes/foto";

    if (!usuario.foto) {
      return URL_IMAGENES + "/imagenes/foto/default.png";
    }

    switch (usuario.tipo) {
      case 'tipo_usuario':
        url += `/Usuario/${usuario.id}/` + usuario.foto;
        break;
      case 'tipo_docente':
        url += `/Docente/${usuario.id}/` + usuario.foto;
        break;
      case 'tipo_estudiante':
        url += `/Estudiante/${usuario.id}/` + usuario.foto;
        break;
      case 'tipo_admin':
        url += `/Admin/${usuario.id}/` + usuario.foto;
        break;
      default:
        url += "/imagenes/foto/default.png";
    }

    return url;
  }

}
