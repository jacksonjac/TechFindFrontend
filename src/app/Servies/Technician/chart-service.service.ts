import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface AppConfig {
  dark: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {
  private configSubject = new BehaviorSubject<AppConfig>({ dark: false });
  configUpdate$ = this.configSubject.asObservable();

  get config(): AppConfig {
    return this.configSubject.value;
  }

  updateConfig(newConfig: AppConfig) {
    this.configSubject.next(newConfig);
  }
}
