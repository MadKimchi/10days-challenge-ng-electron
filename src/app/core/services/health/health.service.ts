import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { HealthData } from './health.class';
import { HealtDatahTypeEnum } from './health.enum';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
    public onHealthUpdate: Subject<HealthData> = new Subject<HealthData>();

    public flowData: HealthData;
    public volumeData: HealthData;
    public pressureData: HealthData;

    public mockFlow = [0, 2, 4, 8, 16, 8, 4, 2, 1];
    public mockVolume = [0, 300, 400, 500, 400, 300, 200, 100, 50, 0];
    public mockPressure = [25, 25, 22, 20, 18, 15, 12, 9, 5, 5];

    private _count = 0;
    // public initialData = [
    //     {
    //         timestamp: 1,
    //         circuitId: 1,
    //         flow: 0,
    //         volume: 0,
    //         pressure: 0
    //     },
    //     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    //     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'} 
    // ];
    constructor() {
        this.flowData = new HealthData(HealtDatahTypeEnum.flow, 18);
        this.volumeData = new HealthData(HealtDatahTypeEnum.volume, 18);
        this.pressureData = new HealthData(HealtDatahTypeEnum.pressure, 18);
        this.mockFlow.forEach((sec: number) => {
            
        });

        timer(0, 100).subscribe((sec: number) => {
            this.flowData.add({
                timestamp: sec,
                value: this.mockFlow[this._count]
            });

            if (this._count >= this.mockFlow.length-1) {
                this._count = 0;
            }
            this._count++;
            this.onHealthUpdate.next(this.flowData);
            return;
        })
    }
}
