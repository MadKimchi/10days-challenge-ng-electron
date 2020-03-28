import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

import { HealthService } from '../../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-airflow-chart',
    templateUrl: './airflow-chart.component.html',
    styleUrls: ['./airflow-chart.component.scss'],
    moduleId: module.id
})
export class AirflowChartComponent implements OnInit, AfterViewInit {
    @Input() public chartId: string = `chart${module.id}`;
    public chart: Chart;
    
    private _unbsubscriber: Subject<void> = new Subject<void>();
    @ViewChild('airflowChart') private _airflowChart: ElementRef;

    constructor(
        private _healthService: HealthService
        
    ) { }
    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
      if (this._airflowChart) {
        this.chart = this.initChart(this._airflowChart.nativeElement);
        this.subscribeToSubjects();
      }
    }

    private initChart(canvas: HTMLCanvasElement): Chart {
      console.log(canvas);
      var speedData = {
        labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
        datasets: [{
          label: "Car Speed",
          data: [0, 59, 75, 20, 20, 55, 40],
          pointRadius: 0,
          stepped: true,
          fill: false,
          lineTension: 0.1,
        }]
      };
       
      return new Chart(canvas.getContext('2d'), {
          type: 'line',
          data: speedData,
      });
    }

    private subscribeToSubjects(): void {
      this._healthService
          .onHealthUpdate
          .pipe(takeUntil(this._unbsubscriber))
          .subscribe((value: number) => {
            this.chart.data.datasets[0].data[0] = value;
            this.chart.update();
          });
    }
}
