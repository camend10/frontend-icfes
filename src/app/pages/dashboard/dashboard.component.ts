import { Component } from '@angular/core';
import { GeneralService, InformeService } from '../../services/service.index';
import { EMPTY, catchError, map } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import * as echarts from 'echarts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Simulacro } from '../../models/simulacro.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  cargando: boolean = true;
  estudiantes: number = 0;
  docentes: number = 0;
  usuarios: number = 0;
  preguntas: number = 0;

  avanzado: number = 0;
  satisfactorio: number = 0;
  minimo: number = 0;
  insuficiente: number = 0;

  simulacro_id: number = 0;
  simulacros: Simulacro[] = [];

  constructor(
    public _generalService: GeneralService,
    public router: Router,
    public _informeService: InformeService
  ) {
    this.cargarSimulacros();
    this.cargarDashboard();
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

  cambioDashboard(){

    this.cargando = true;
    this._generalService.cambioDashboard(this.simulacro_id)
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
        this.cargando = false;
        this.avanzado = resp.datos['avanzado'];
        this.satisfactorio = resp.datos['satisfactorio'];
        this.minimo = resp.datos['minimo'];
        this.insuficiente = resp.datos['insuficiente'];

        let estadisticasIngles = resp.datos['estadisticasSimulacrosIngles'];
        let categorias = estadisticasIngles.map((item: any, index: number) => item.categoria);
        let porcentajes = estadisticasIngles.map((item: any, index: number) => item.porcentaje);


        this.grafEstTotalSimulacrosIngles(categorias, porcentajes);
      });
  }

  cargarDashboard() {
    this.cargando = true;
    this._generalService.cargarDashboard()
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
        this.cargando = false;
        this.estudiantes = resp.datos['estudiantes'];
        this.docentes = resp.datos['docentes'];
        this.usuarios = resp.datos['usuarios'];
        this.preguntas = resp.datos['preguntas'];
        this.avanzado = resp.datos['avanzado'];
        this.satisfactorio = resp.datos['satisfactorio'];
        this.minimo = resp.datos['minimo'];
        this.insuficiente = resp.datos['insuficiente'];

        let estadisticasIngles = resp.datos['estadisticasSimulacrosIngles'];
        let categorias = estadisticasIngles.map((item: any, index: number) => item.categoria);
        let porcentajes = estadisticasIngles.map((item: any, index: number) => item.porcentaje);


        this.grafEstTotalSimulacrosIngles(categorias, porcentajes);
      });
  }

  grafEstTotalSimulacrosIngles(categorias: any, porcentajes: any) {
    setTimeout(() => {

      type EChartsOption = echarts.EChartsOption;

      var chartDom = document.getElementById('grafEstTotalSimulacrosIngles')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: categorias,
            axisTick: {
              alignWithLabel: true,
              show: true,
              inside: false,
              length: 5
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: 5
          }
        ],
        series: [
          {
            name: 'Porcentaje',
            type: 'bar',
            barWidth: '60%',
            tooltip: {
              valueFormatter: function (value: any) {
                return value + '%';
              }
            },
            data: porcentajes
          }
        ]
      };

      option && myChart.setOption(option);

    }, 1000);
  }
}
