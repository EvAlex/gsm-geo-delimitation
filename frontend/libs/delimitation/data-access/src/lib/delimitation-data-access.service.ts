import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DelimitatonDataAccess } from './delimitation-data-access';
import { DelimitationResult } from './delimitation-result';

@Injectable()
export class DelimitatonDataAccessService implements DelimitatonDataAccess {
    runDelimitation(): Observable<DelimitationResult> {
        throw new Error('Method not implemented.');
    }
}