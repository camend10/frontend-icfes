import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';

interface Valoracion {
  valoracion: string;
  categoria: string;
  minimo: number;
  maximo: number;
}

interface Desempeno {
  area: string;
  desempenoInsuficiente: {
    minimo: number;
    maximo: number;
  };
  desempenoMinimo: {
    minimo: number;
    maximo: number;
  };
  desempenoSatisfactorio: {
    minimo: number;
    maximo: number;
  };
  desempenoAvanzado: {
    minimo: number;
    maximo: number;
  };
}

// Definir un tipo de datos para representar cada fila de la tabla
interface Rango {
  minimo: number;
  maximo: number;
}

// Definir un tipo de datos para representar toda la tabla
interface Tabla {
  [clave: string]: Rango;
}

@Injectable({
  providedIn: 'root'
})

export class InformeService {

  nivelG: Valoracion[] = [
    { valoracion: 'Avanzado', categoria: 'A', minimo: 437, maximo: 500 },
    { valoracion: 'Satisfactorio', categoria: 'S', minimo: 325, maximo: 436.99 },
    { valoracion: 'Minimo', categoria: 'M', minimo: 221, maximo: 324.99 },
    { valoracion: 'Insuficiente', categoria: 'I', minimo: 0, maximo: 220.99 }
  ];

  datosDesempenoAreas: Desempeno[] = [
    {
      area: 'Matemáticas',
      desempenoInsuficiente: { minimo: 0, maximo: 35.99 },
      desempenoMinimo: { minimo: 36, maximo: 50.99 },
      desempenoSatisfactorio: { minimo: 51, maximo: 70.99 },
      desempenoAvanzado: { minimo: 71, maximo: 100 }
    },
    {
      area: 'Lectura Crítica',
      desempenoInsuficiente: { minimo: 0, maximo: 35.99 },
      desempenoMinimo: { minimo: 36, maximo: 50.99 },
      desempenoSatisfactorio: { minimo: 51, maximo: 65.99 },
      desempenoAvanzado: { minimo: 66, maximo: 100 }
    },
    {
      area: 'Sociales y Ciudadanas',
      desempenoInsuficiente: { minimo: 0, maximo: 40.99 },
      desempenoMinimo: { minimo: 41, maximo: 55.99 },
      desempenoSatisfactorio: { minimo: 56, maximo: 70.99 },
      desempenoAvanzado: { minimo: 71, maximo: 100 }
    },
    {
      area: 'Ciencias Naturales',
      desempenoInsuficiente: { minimo: 0, maximo: 40.99 },
      desempenoMinimo: { minimo: 41, maximo: 55.99 },
      desempenoSatisfactorio: { minimo: 56, maximo: 70.99 },
      desempenoAvanzado: { minimo: 71, maximo: 100 }
    }
  ];

  tabla: Tabla = {
    'B1': { minimo: 71, maximo: 100 },
    'A2': { minimo: 58, maximo: 70.99 },
    'A1': { minimo: 37, maximo: 57.99 },
    'A-': { minimo: 0, maximo: 36.99 }
  };

  constructor(public http: HttpClient,
    public router: Router) { }

  cargarSimulacros = () => {
    let url = URL_SERVICIOS + '/simulacros';

    let data = {
      txtbusqueda: ''
    };

    return this.http.post(url, data);
  }

  cargarResultado = (simulacro_id: number, grado_id: number, curso_id: number, institucion_id: number) => {
    let url = URL_SERVICIOS + '/informes/resultados';

    let data = {
      simulacro_id: simulacro_id,
      grado_id: grado_id,
      curso_id: curso_id,
      institucion_id: institucion_id
    };

    return this.http.post(url, data);
  }

  verificarResultadoSesiones(simulacro_id: number, user_id: number) {
    let url = URL_SERVICIOS + '/simulacros/verificar-resultado-sesiones';

    let data = {
      simulacro_id: simulacro_id,
      user_id: user_id
    };

    return this.http.post(url, data);
  }

  obtenerRango(numero: number): string {
    for (let valoracion of this.nivelG) {
      if (numero >= valoracion.minimo && numero <= valoracion.maximo) {
        return valoracion.valoracion;
      }
    }
    return 'Fuera de rango';
  }

  determinarRango(numero: number, area: string): string {
    const desempeno = this.datosDesempenoAreas.find(item => item.area === area);

    if (desempeno) {
      if (numero >= desempeno.desempenoAvanzado.minimo && numero <= desempeno.desempenoAvanzado.maximo) {
        return 'Avanzado';
      } else if (numero >= desempeno.desempenoSatisfactorio.minimo && numero <= desempeno.desempenoSatisfactorio.maximo) {
        return 'Satisfactorio';
      } else if (numero >= desempeno.desempenoMinimo.minimo && numero <= desempeno.desempenoMinimo.maximo) {
        return 'Minimo';
      } else if (numero >= desempeno.desempenoInsuficiente.minimo && numero <= desempeno.desempenoInsuficiente.maximo) {
        return 'Insuficiente';
      } else {
        return 'Número fuera de rango';
      }
    } else {
      return 'Área no encontrada';
    }
  }

  // Función para determinar en qué rango se encuentra un número
  encontrarRango(numero: number): string | null {    
    for (const clave in this.tabla) {
      if (this.tabla.hasOwnProperty(clave)) {        
        const rango = this.tabla[clave];
        if (numero >= rango.minimo && numero <= rango.maximo) {
          return clave;
        }
      }
    }
    return null; // Devolver null si el número no está en ningún rango
  }

  cargarResultadoInstitucion = (simulacro_id: number, grado_id: number, curso_id: number, institucion_id: number) => {
    let url = URL_SERVICIOS + '/informes/resultados-institucion';

    let data = {
      simulacro_id: simulacro_id,
      grado_id: grado_id,
      curso_id: curso_id,
      institucion_id: institucion_id
    };

    return this.http.post(url, data);
  }

  cargarResultadoComparativo = (grado_id: number, institucion_id: number) => {
    let url = URL_SERVICIOS + '/informes/comparativo';

    let data = {      
      grado_id: grado_id,
      institucion_id: institucion_id
    };

    return this.http.post(url, data);
  }


}
