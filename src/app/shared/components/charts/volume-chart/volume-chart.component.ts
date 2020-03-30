import { Component } from '@angular/core';
import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'app-volume-chart',
  templateUrl: './volume-chart.component.html',
  styleUrls: ['./volume-chart.component.scss'],
  moduleId: module.id
})
export class VolumeChartComponent extends BaseChartComponent {}
