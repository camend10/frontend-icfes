import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from '../config/config';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, id: string, tipo: string, institucion_id: number = 0): any {

    if (tipo === 'instituciones') {
      let url = URL_IMAGENES + "/imagenes/instituciones";
      if (imagen == 'xxxxx' || imagen == null || imagen == '') {
        return URL_IMAGENES + "/imagenes/instituciones/default.png";
      }
      return url += `/${id}/` + imagen;
    }

    if (tipo === 'materias') {
      let url = URL_IMAGENES + "/imagenes/materias";
      if (imagen == 'xxxxx' || imagen == null || imagen == '') {
        return URL_IMAGENES + "/imagenes/materias/no-data.png";
      }
      return url += `/${id}/` + imagen;
    }

    let url = URL_IMAGENES + `/imagenes/foto/${institucion_id}`;

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
