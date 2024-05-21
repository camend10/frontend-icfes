import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../models/curso.model';
import { Grado } from '../../../models/grado.model';
import { Simulacro } from '../../../models/simulacro.model';
import { Institucion } from '../../../models/institucion.model';
import { ToastrService } from 'ngx-toastr';
import { GeneralService, InformeService, InstitucionService } from '../../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Puntaje } from '../../../models/puntaje.model';
import * as echarts from 'echarts';

interface maxminData {
  name: string,
  data: number[]
}

interface gradoCursoEstudiante {
  value: number[],
  name: string
}

interface materiasMax {
  name: string,
  max: number
}

interface cursoEstudiante {
  name: string,
  data: number[]
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {

  cursos: Curso[] = [];
  grados: Grado[] = [];
  simulacros: Simulacro[] = [];
  instituciones: Institucion[] = [];

  institucion!: Institucion;

  cargando: boolean = true;
  busqueda: boolean = false;

  grado_id: number = 1;
  curso_id: number = 0;
  simulacro_id: number = 1;
  institucion_id: number = 1;

  totalEstudiantes: number = 0;
  totalPreguntas: number = 0;
  global: number = 0;
  contador: number = 0;
  sobre1: number = 0;
  sobre2: number = 0;
  puntaje: any = [];
  puestosCursos: any = [];
  maxminData: maxminData[] = [];
  materias: any[] = [];

  gradoCursoEstudiante: gradoCursoEstudiante[] = [];
  materiasMax: materiasMax[] = [];
  cursoEstudiante: cursoEstudiante[] = [];

  fecha: string = '';
  infoCompleta: boolean = false;
  resComp: any[] = [];
  resComponentesMatematicas: any[] = [];
  resComponentesLenguaje: any[] = [];
  resComponentesSociales: any[] = [];
  resComponentesNaturales: any[] = [];
  resComponentesIngles: any[] = [];

  resCompetenciasMatematicas: any[] = [];
  resCompetenciasLenguaje: any[] = [];
  resCompetenciasSociales: any[] = [];
  resCompetenciasNaturales: any[] = [];
  resCompetenciasIngles: any[] = [];

  constructor(private toastr: ToastrService,
    public _generalService: GeneralService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _institucionService: InstitucionService,
    public _informeService: InformeService
  ) {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarGrados();
    this.cargarSimulacros();
    this.cargarInstituciones();
  }

  cargarCursos() {
    this._generalService.cargarCursos()
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
      .subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
      })
  }

  cargarGrados() {
    this._generalService.cargarGrados()
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
      .subscribe((grados: Grado[]) => {
        this.grados = grados;
      })
  }

  cargarSimulacros() {
    this._informeService.cargarSimulacros()
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
        this.simulacros = resp.simulacros;
      })
  }

  cargarInstituciones() {
    this._institucionService.cargarInstitucionesActivas()
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
      .subscribe((instituciones: Institucion[]) => {
        this.instituciones = instituciones;
      })
  }

  buscar() {

    if (this.institucion_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione una institución',
        icon: "error"
      });
      return;
    }

    if (this.grado_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione un grado',
        icon: "error"
      });
      return;
    }

    if (this.simulacro_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione una prueba diagnóstica',
        icon: "error"
      });
      return;
    }
    this.busqueda = false;
    this._informeService.cargarResultadoInstitucion(this.simulacro_id, this.grado_id, this.curso_id, this.institucion_id)
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

        if (resp.totalEstudiantes <= 0) {
          this.busqueda = false;
          Swal.fire({
            title: "Información!",
            text: 'No existe prueba diagnóstica para estos datos',
            icon: "info"
          });
          return;
        }

        this.institucion = resp.institucion;
        this.totalEstudiantes = resp.totalEstudiantes;
        this.totalPreguntas = resp.totalPreguntas;
        this.global = resp.global;
        this.contador = resp.contador;
        this.sobre1 = this.contador * 100;
        this.sobre2 = this.sobre1 / this.contador;
        this.puntaje = resp.puntaje;
        this.puestosCursos = resp.puestosCursos;
        this.maxminData = resp.maxminData;
        this.materias = resp.materias;
        this.gradoCursoEstudiante = resp.gradoCursoEstudiante;
        this.materiasMax = resp.materiasMax;
        this.cursoEstudiante = resp.cursoEstudiante;

        this.resComp = resp.resComp;

        this.resComponentesMatematicas = this.resComp['resComponentesMatematicas' as keyof typeof this.resComp];
        this.resComponentesLenguaje = this.resComp['resComponentesLenguaje' as keyof typeof this.resComp];
        this.resComponentesSociales = this.resComp['resComponentesSociales' as keyof typeof this.resComp];
        this.resComponentesNaturales = this.resComp['resComponentesNaturales' as keyof typeof this.resComp];
        this.resComponentesIngles = this.resComp['resComponentesIngles' as keyof typeof this.resComp];

        this.resCompetenciasMatematicas = this.resComp['resCompetenciasMatematicas' as keyof typeof this.resComp];
        this.resCompetenciasLenguaje = this.resComp['resCompetenciasLenguaje' as keyof typeof this.resComp];
        this.resCompetenciasSociales = this.resComp['resCompetenciasSociales' as keyof typeof this.resComp];
        this.resCompetenciasNaturales = this.resComp['resCompetenciasNaturales' as keyof typeof this.resComp];
        this.resCompetenciasIngles = this.resComp['resCompetenciasIngles' as keyof typeof this.resComp];
        this.busqueda = true;

        this.grafMaxMin();

        if (this.curso_id != 0) {
          this.grafEstVsSalon();
          this.grafEstVsCurso();
        }
      })
  }

  grafMaxMin() {

    setTimeout(() => {

      var app: any = {};

      var chartDom = document.getElementById('graPunMaxMin');
      var myChart = echarts.init(chartDom);
      var option;

      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ] as const;

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {} as Record<string, string>)
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'inside',
        distance: 15,
        onChange: function () {
          const labelOption: BarLabelOption = {
            rotate: app.config.rotate as BarLabelOption['rotate'],
            align: app.config.align as BarLabelOption['align'],
            verticalAlign: app.config
              .verticalAlign as BarLabelOption['verticalAlign'],
            position: app.config.position as BarLabelOption['position'],
            distance: app.config.distance as BarLabelOption['distance']
          };
          myChart.setOption<echarts.EChartsOption>({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };

      const labelOption: BarLabelOption = {
        show: true,
        position: app.config.position as BarLabelOption['position'],
        distance: app.config.distance as BarLabelOption['distance'],
        align: app.config.align as BarLabelOption['align'],
        verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
        rotate: app.config.rotate as BarLabelOption['rotate'],
        // formatter: '{c}  {name|{a}}',
        formatter: '{c} ',
        fontSize: 16,
        rich: {
          name: {}
        }
      };

      let seriesMaxMin = this.maxminData.map(item => {
        return {
          name: item.name,
          type: 'bar',
          label: labelOption, // Asegúrate de definir labelOption adecuadamente
          emphasis: {
            focus: 'series'
          },
          data: item.data
        };
      });

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Puntaje Máximo', 'Puntaje Estudiante', 'Puntaje Promedio', 'Puntaje Mínimo']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar', 'stack'] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.materias
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: seriesMaxMin
      };

      option && myChart.setOption(option);
    }, 1500);
    // const chartDom = this.elRef.nativeElement.querySelector('#graPunMaxMin');
  }

  grafEstVsSalon() {
    setTimeout(() => {

      var dom = document.getElementById('graProEstVsSal');
      var myChart: any = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var app = {};

      let data = this.gradoCursoEstudiante.map(item => {
        return {
          value: item.value,
          name: item.name
        };
      });

      var option;

      option = {
        title: {
          text: ''
        },
        legend: {
          data: ['Grado', 'Estudiante', 'Curso']
        },
        radar: {
          // shape: 'circle',
          indicator: this.materiasMax
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: data
          }
        ]
      };


      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);

    }, 1000);
  }


  grafEstVsCurso() {
    setTimeout(() => {

      var chartDom = document.getElementById('grafEstVsCurso');
      var myChart = echarts.init(chartDom);
      var option;

      let series = this.cursoEstudiante.map((item, index) => {
        return {
          name: item.name,
          type: index === 1 ? 'line' : 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return value + '';
            }
          },
          data: item.data
        };
      });

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['Promedio Grado', 'Promedio Curso']
        },
        xAxis: [
          {
            type: 'category',
            data: this.materias,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Promedio Curso',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: series
      };

      option && myChart.setOption(option);

    }, 1000);
  }

  encontrarIndicePorId(id: number, vector: any[]): number {
    return vector.findIndex(vec => vec.id === Number(id));
  }

  cambio() {
    this.busqueda = false;
  }

  returnformateado(numero: string) {
    return parseFloat(numero);
  }

}
