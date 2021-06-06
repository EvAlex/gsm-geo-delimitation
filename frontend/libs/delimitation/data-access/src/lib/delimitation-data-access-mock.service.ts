import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { DelimitatonDataAccessMock } from './delimitation-data-access-mock';
import { DelimitationResult } from './delimitation-result';

const DELIMITATION_STORAGE_KEY = 'delimitationResult';

@Injectable()
export class DelimitatonDataAccessMockService
  implements DelimitatonDataAccessMock {
  saveDelimitationResult(value: DelimitationResult): Observable<void> {
    window.localStorage.setItem(
      DELIMITATION_STORAGE_KEY,
      JSON.stringify(value)
    );

    return of(0) as any;
  }

  runDelimitation(): Observable<DelimitationResult> {
    const data = window.localStorage.getItem(DELIMITATION_STORAGE_KEY);
    const zones = JSON.parse(data) as DelimitationResult;

    return timer(1000 + 1_000 * Math.random()).pipe(
      mapTo(zones || { zones: [] })
    );
  }
}
