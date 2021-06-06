import { Observable } from 'rxjs';
import { DelimitatonDataAccess } from './delimitation-data-access';
import { DelimitationResult } from './delimitation-result';

export interface DelimitatonDataAccessMock extends DelimitatonDataAccess {
    saveDelimitationResult(value: DelimitationResult): Observable<void>;
}