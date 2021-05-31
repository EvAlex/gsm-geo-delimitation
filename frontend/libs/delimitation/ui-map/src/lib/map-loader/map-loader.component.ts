import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, mapTo, catchError } from 'rxjs/operators';

const API_KEY = 'Google Maps API KEY';

@Component({
  selector: 'gsm-geo-delimitation-map-loader',
  templateUrl: './map-loader.component.html',
  styleUrls: ['./map-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLoaderComponent {
  private readonly refreshKey$ = new BehaviorSubject(0);

  private readonly apiKey$ = this.refreshKey$.pipe(
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

  @ContentChild(TemplateRef) readonly templateRef: TemplateRef<any>;

  constructor(private readonly httpClient: HttpClient) {}

  saveApiKey() {
    const key = this.apiKeyControl.value;

    localStorage.setItem(API_KEY, key);

    this.refreshKey$.next(0);
  }
}
