import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GeoSearchParams } from './geo-search-params';
import { GsmTrack } from './gsm-track';

@Injectable({ providedIn: 'root' })
export class GeoSearchDataAccessService {
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

    return this.httpClient.get<GsmTrack[]>(`/gsm-tracks?${queryParams}`).pipe(
      catchError((e: HttpErrorResponse) =>
        e.status === 404
          ? timer(300 + 1_000 * Math.random()).pipe(
              map(
                () =>
                  [
                    {
                      points: [
                        {
                          lat: 55.7711567799696,
                          lng: 37.62694947104244,
                        },
                        {
                          lat: 55.74584998908728,
                          lng: 37.64857880453853,
                        },
                        {
                          lat: 55.7431444751991,
                          lng: 37.58746735434322,
                        },
                      ],
                    },
                  ] as GsmTrack[]
              )
            )
          : throwError(e)
      )
    );
  }
}
