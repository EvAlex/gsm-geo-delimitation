import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { mapTo, catchError, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

const API_KEY = 'Google Maps API KEY';

@Component({
  selector: 'gsm-geo-delimitation-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  readonly refreshKey$ = new BehaviorSubject(0);
  readonly apiKey$ = this.refreshKey$.pipe(
    map(() => localStorage.getItem(API_KEY))
  );
  readonly noKey$ = this.apiKey$.pipe(map((key) => !key));
  readonly apiLoaded$ = this.apiKey$.pipe(
    switchMap((key) =>
      this.httpClient
        .jsonp(`https://maps.googleapis.com/maps/api/js?key=${key}`, 'callback')
        .pipe(
          mapTo(true),
          catchError(() => of(false))
        )
    )
  );

  readonly apiKeyControl = new FormControl();

  readonly options: google.maps.MapOptions = {
    center: { lat: 55.755833, lng: 37.617222 },
    zoom: 12,
  };

  constructor(private readonly httpClient: HttpClient) {}

  saveApiKey() {
    const key = this.apiKeyControl.value;

    localStorage.setItem(API_KEY, key);

    this.refreshKey$.next(0);
  }
}
