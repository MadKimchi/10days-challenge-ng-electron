import { Component, Input, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

import { HealthService } from '../../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IHealthData } from '../../../core/services/health/health.interface';
import { HealthData } from '../../../core/services/health';

@Component({
  template: ``,
  moduleId: module.id
})
export class BaseChartComponent implements AfterViewInit {
  @Input() public chartId: string = `chart${module.id}`;
  public chart: Chart;
    
  private _unbsubscriber: Subject<void> = new Subject<void>();
  @ViewChild('airflowChart') private _airflowChart: ElementRef;

  constructor(private _healthService: HealthService) { }

  public ngAfterViewInit(): void {
    if (this._airflowChart) {
      this.chart = this.initChart(this._airflowChart.nativeElement);
      this.subscribeToSubjects();
    }
  }

  private initChart(canvas: HTMLCanvasElement): Chart {
    var speedData = {
      labels: [],
      datasets: [{
        // label: "Car Speed",
        data: [],
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
      .subscribe((data: HealthData) => {
        this.chart.data.datasets[0].data = data.data;
        this.chart.data.labels = data.time;
        this.chart.update();
      });
  }
}
