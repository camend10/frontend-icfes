import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;
@Component({
  selector: 'app-grafico',
  template: '<div class="chart" [attr.id]="chartId" style="width: 100%; height: 400px;"></div>'
})
export class GraficoComponent implements AfterViewInit  {
  @Input() chartId!: string; // ID único para cada gráfico
  @Input() materia!: string; // Nombre de la materia
  @Input() totSimu!: string; // Nombre de la materia
  @Input() datos!: { [key: number]: { desviacion: number } }; // Datos de los simulacros

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    const chartDom = document.getElementById(this.chartId)!;
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: this.materia,
        },
        xAxis: {
          type: 'category',
          // data: Object.keys(this.datos), // Simulacro IDs como etiquetas
          data: this.totSimu, // Simulacro IDs como etiquetas
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56',
            },
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: Object.values(this.datos).map(d => d.desviacion), // Obtener las desviaciones
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
          },
        ],
      };
  
      myChart.setOption(option);
    }
  }
}
