import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
    public onHealthUpdate: Subject<number> = new Subject<number>();
    public initialData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'} 
    ];    
    constructor() {
        timer(0, 2000).subscribe((value) => {
            console.log(value);
            this.onHealthUpdate.next(30 + value);
        })
    }
}
