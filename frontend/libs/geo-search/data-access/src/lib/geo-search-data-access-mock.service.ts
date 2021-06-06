import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { GeoSearchDataAccessMock } from './geo-search-data-access-mock';
import { GeoSearchParams } from './geo-search-params';
import { GsmTrack } from './gsm-track';

const TRACKS_STORAGE_KEY = 'gsmTracks';

@Injectable()
export class GeoSearchDataAccessMockService implements GeoSearchDataAccessMock {
  saveTracks(tracks: GsmTrack[]): Observable<void> {
    window.localStorage.setItem(TRACKS_STORAGE_KEY, JSON.stringify(tracks));

    return of(0) as any;
  }

  queryTracks(params: GeoSearchParams): Observable<GsmTrack[]> {
    const data = window.localStorage.getItem(TRACKS_STORAGE_KEY);
    const tracks = JSON.parse(data) as GsmTrack[];

    return timer(300 + 1_000 * Math.random()).pipe(mapTo(tracks || []));
  }
}
