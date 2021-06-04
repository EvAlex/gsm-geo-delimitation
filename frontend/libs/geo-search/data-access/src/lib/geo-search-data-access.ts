import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoSearchParams } from './geo-search-params';
import { GsmTrack } from './gsm-track';

export const GEO_SEARCH_DATA_ACCESS = new InjectionToken('GeoSearchDataAccess');

export interface GeoSearchDataAccess {
  queryTracks(params: GeoSearchParams): Observable<GsmTrack[]>;
}
