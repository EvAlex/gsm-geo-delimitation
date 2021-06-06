import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DelimitationResult } from './delimitation-result';

export const DELIMITATION_DATA_ACCESS = new InjectionToken('DelimitatonDataAccess');

export interface DelimitatonDataAccess {
  runDelimitation(): Observable<DelimitationResult>;
}
