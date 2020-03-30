import { Component } from '@angular/core';
import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'app-pressure-chart',
  templateUrl: './pressure-chart.component.html',
  styleUrls: ['./pressure-chart.component.scss'],
  moduleId: module.id
})
export class PressureChartComponent extends BaseChartComponent {}
