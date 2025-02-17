import { Component } from '@angular/core';
import { Grado } from '../../../models/grado.model';
import { Simulacro } from '../../../models/simulacro.model';
import { Institucion } from '../../../models/institucion.model';
import { ToastrService } from 'ngx-toastr';
import { GeneralService, InformeService, InstitucionService } from '../../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';
import * as echarts from 'echarts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-comparativo',
  templateUrl: './comparativo.component.html',
  styleUrl: './comparativo.component.css'
})
export class ComparativoComponent {

  grados: Grado[] = [];
  simulacros: Simulacro[] = [];
  instituciones: Institucion[] = [];

  institucion!: Institucion;

  cargando: boolean = true;
  busqueda: boolean = false;

  grado_id: number = 1;
  simulacro_id: number = 1;
  institucion_id: number = 1;

  historicoPromedioArea: any[] = [];
  TotalSimulacros: any = [];
  PuntajeTotalPromedioSimulacro: any = [];
  totalEstudiantesSimulacros: any = [];
  historial_desempenos: any[] = [];
  materias_desviacion_Separadas: any[] = [];
  datos_desviaciones: any[] = [];


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
    this.cargarGrados();
    this.cargarSimulacros();
    this.cargarInstituciones();
    this.closeSidebar();
  }

  ngOnDestroy(): void {
    // Quitar el atributo cuando el componente se destruye
    document.body.removeAttribute('data-kt-app-sidebar-minimize');

  }

  closeSidebar() {
    const bodyTag = document.body;
    bodyTag.setAttribute('data-kt-app-sidebar-minimize', 'on');
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

  cambio() {
    this.busqueda = false;
  }

  buscar() {
    this.busqueda = false;
    this.cargando = true;
    this._informeService.cargarResultadoComparativo(this.grado_id, this.institucion_id)
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
        if (resp.contador <= 0) {
          this.busqueda = false;
          Swal.fire({
            title: "Información!",
            text: 'No existe información para este grado',
            icon: "info"
          });
          return;
        }

        this.historicoPromedioArea = resp.historicoPromedioArea;
        this.TotalSimulacros = resp.TotalSimulacros;
        this.PuntajeTotalPromedioSimulacro = resp.PuntajeTotalPromedioSimulacro;
        this.totalEstudiantesSimulacros = resp.totalEstudiantesSimulacros;
        this.historial_desempenos = resp.historial_desempenos;
        this.materias_desviacion_Separadas = resp.materias_desviacion_Separadas;

        this.datos_desviaciones = Object.keys(this.materias_desviacion_Separadas).map((key: string) => ({
          materiaId: parseInt(key),
          materia: this.materias_desviacion_Separadas[key as keyof typeof this.materias_desviacion_Separadas].materia,
          simulacros: this.materias_desviacion_Separadas[key as keyof typeof this.materias_desviacion_Separadas].simulacros
        }));

        this.graHistoricosPorAreas();
        this.graHistoricosPromedioGlobal();
        this.graHistoricosCantidadEstudiantes();

        this.busqueda = true;
        this.cargando = false;
      })
  }

  graHistoricosPorAreas() {

    setTimeout(() => {

      const pruebasArray = this.TotalSimulacros;
      // Generamos el array series
      const seriesBase = [
        { type: 'bar', seriesLayoutBy: 'row' },
        { type: 'bar', seriesLayoutBy: 'row' },
        { type: 'bar', seriesLayoutBy: 'row' },
        { type: 'bar', seriesLayoutBy: 'row' },
        { type: 'bar', seriesLayoutBy: 'row' }
      ];

      // Contamos los elementos adicionales en pruebasArray (excluyendo el primer elemento "prueba")
      const additionalBarsCount = pruebasArray.length - 1;


      // Generamos las series adicionales según la cantidad en pruebasArray
      const additionalBars = Array.from({ length: additionalBarsCount }, () => ({
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1
      }));

      // Unimos seriesBase con additionalBars
      const series = [...seriesBase, ...additionalBars];

      var chartDom = document.getElementById('graHistoricosPorAreas');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.historicoPromedioArea
        },
        xAxis: [
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: series
      };

      option && myChart.setOption(option);
    }, 1500);
    // const chartDom = this.elRef.nativeElement.querySelector('#graPunMaxMin');
  }

  graHistoricosPromedioGlobal() {

    setTimeout(() => {

      const pruebasArray = this.TotalSimulacros;

      const datosFiltrados = pruebasArray.slice(1);

      var chartDom = document.getElementById('graHistoricosPromedioGlobal');
      var myChart = echarts.init(chartDom);
      var option;


      option = {

        xAxis: {
          type: 'category',
          data: datosFiltrados
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },

        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.PuntajeTotalPromedioSimulacro,
            type: 'line',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      option && myChart.setOption(option);
    }, 1500);
    // const chartDom = this.elRef.nativeElement.querySelector('#graPunMaxMin');
  }

  graHistoricosCantidadEstudiantes() {

    setTimeout(() => {

      const pruebasArray = this.TotalSimulacros;

      const datosFiltrados = pruebasArray.slice(1);

      var chartDom = document.getElementById('graHistoricosCantidadEstudiantes');
      var myChart = echarts.init(chartDom);
      var option;


      option = {

        xAxis: {
          type: 'category',
          data: datosFiltrados
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },

        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: "Estudiantes",
            data: this.totalEstudiantesSimulacros,
            type: 'line',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      option && myChart.setOption(option);
    }, 1500);
    // const chartDom = this.elRef.nativeElement.querySelector('#graPunMaxMin');
  }

  getClassForValue(area: string, value: number): string {
    let className = '';

    switch (area) {
      case 'Matemáticas':
        if (value <= 35.99) className = 'insuficiente';
        else if (value <= 50.99) className = 'minimo';
        else if (value <= 70.99) className = 'satisfactorio';
        else if (value <= 100) className = 'avanzado';
        break;

      case 'Lectura Crítica':
        if (value <= 35.99) className = 'insuficiente';
        else if (value <= 50.99) className = 'minimo';
        else if (value <= 65.99) className = 'satisfactorio';
        else if (value <= 100) className = 'avanzado';
        break;

      case 'Sociales y Ciudadanas':
        if (value <= 40.99) className = 'insuficiente';
        else if (value <= 55.99) className = 'minimo';
        else if (value <= 70.99) className = 'satisfactorio';
        else if (value <= 100) className = 'avanzado';
        break;

      case 'Ciencias Naturales':
        if (value <= 40.99) className = 'insuficiente';
        else if (value <= 55.99) className = 'minimo';
        else if (value <= 70.99) className = 'satisfactorio';
        else if (value <= 100) className = 'avanzado';
        break;

      case 'Ingles':
        if (value <= 36.99) className = 'insuficiente';
        else if (value <= 57.99) className = 'minimo';
        else if (value <= 70.99) className = 'satisfactorio';
        else if (value <= 100) className = 'avanzado';
        break;
    }

    return className;
  }

  imprimir() {
    Swal.fire({
      title: 'Imprimiendo...',
      html: 'Espere por favor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          this.crearPdf();
        }, 1000);
      }
    });
  }

  async crearPdf() {

    const data = document.getElementById('pdfPreview');
    if (data) {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const margin = 10; // Establecer el margen en milímetros
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const contentWidth = pageWidth - margin * 2; // Ajustar ancho del contenido
      let position = margin;

      const generateSectionPDF = async (section: HTMLElement) => {
        const canvas = await html2canvas(section);
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = canvas.height * contentWidth / canvas.width;

        if (position + imgHeight > pageHeight - margin) {
          pdf.addPage();
          position = margin;
        }

        pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
        position += imgHeight;
      };

      const sections = Array.from(data.querySelectorAll('.pdf-section'));
      for (const section of sections) {
        await generateSectionPDF(section as HTMLElement);
      }

      pdf.save('Estudiante.pdf');
    }
    Swal.close();
  }


}
