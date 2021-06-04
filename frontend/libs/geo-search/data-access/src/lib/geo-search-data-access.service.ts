import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoSearchDataAccess } from './geo-search-data-access';
import { GeoSearchParams } from './geo-search-params';
import { GsmTrack } from './gsm-track';

@Injectable()
export class GeoSearchDataAccessService implements GeoSearchDataAccess {
  constructor(private readonly httpClient: HttpClient) {}

  queryTracks({
    dateTo,
    dateFrom,
    timeFrom,
    timeTo,
    areaBoundary,
  }: GeoSearchParams): Observable<GsmTrack[]> {
    const queryParams = [
      dateTo ? 'dateTo=' + dateTo.toISOString() : null,
      dateFrom ? 'dateFrom=' + dateFrom.toISOString() : null,
      timeTo ? 'timeTo=' + timeTo : null,
      timeFrom ? 'timeFrom=' + timeFrom : null,
      areaBoundary?.length > 0
        ? 'boundary=' + areaBoundary.map((e) => `${e.lat};${e.lng}`).join(';')
        : null,
    ]
      .filter((e) => !!e)
      .join('&');

    return this.httpClient.get<GsmTrack[]>(`/gsm-tracks?${queryParams}`);
  }
}
