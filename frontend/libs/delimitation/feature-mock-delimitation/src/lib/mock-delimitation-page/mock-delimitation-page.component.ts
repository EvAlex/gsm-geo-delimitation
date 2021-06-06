import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  GeoSearchDataAccess,
  GEO_SEARCH_DATA_ACCESS,
} from '@gsm-geo-delimitation/geo-search/data-access';
import {
  DelimitatonDataAccessMock,
  DELIMITATION_DATA_ACCESS,
} from '@gsm-geo-delimitation/delimitation/data-access';
import { timer, combineLatest } from 'rxjs';
import { map, mapTo, startWith, takeWhile, tap } from 'rxjs/operators';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

@Component({
  selector: 'gsm-geo-delimitation-mock-delimitation-page',
  templateUrl: './mock-delimitation-page.component.html',
  styleUrls: ['./mock-delimitation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockDelimitationPageComponent implements OnInit {
  tracks: GeoPoint[][] = [];

  zones = [];

  selectedZoneIndex: number = null;

  get isZoneSelected(): boolean {
    return this.selectedZoneIndex !== null;
  }

  constructor(
    @Inject(GEO_SEARCH_DATA_ACCESS)
    private readonly geoSearchDataAccess: GeoSearchDataAccess,
    @Inject(DELIMITATION_DATA_ACCESS)
    private readonly delimitationDataAccess: DelimitatonDataAccessMock,
    private readonly snackbar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.geoSearchDataAccess
      .queryTracks({
        areaBoundary: [],
        dateTo: null,
        dateFrom: null,
        timeFrom: null,
        timeTo: null,
      })
      .pipe(map((tracks) => tracks.map((e) => e.points)))
      .subscribe((tracks) => {
        this.tracks = tracks;
        this.changeDetector.markForCheck();
      });

    this.delimitationDataAccess
      .runDelimitation()
      .pipe(map(({ zones }) => zones))
      .subscribe((zones) => {
        this.zones = zones;
        this.changeDetector.markForCheck();
      });
  }

  saveZones() {
    const save$ = this.delimitationDataAccess.saveDelimitationResult({
      zones: this.zones,
    });

    let loadingSnackbar: MatSnackBarRef<any>;

    combineLatest([
      timer(100).pipe(mapTo(true), startWith(false)),
      save$.pipe(mapTo(true), startWith(false)),
    ])
      .pipe(
        tap(([showInProgressDelayElapsed, saveComplete]) => {
          if (showInProgressDelayElapsed && !saveComplete) {
            loadingSnackbar = this.snackbar.open('Сохранение...');
          } else if (saveComplete) {
            if (loadingSnackbar) {
              loadingSnackbar.dismiss();
            }

            this.snackbar.open('Сохранено', '', {
              duration: 3_000,
            });
          }
        }),
        takeWhile(([_, saveComplete]) => !saveComplete)
      )
      .subscribe();
  }

  addZone() {
    this.zones = this.zones.concat([[]]);
    this.selectedZoneIndex = this.zones.length - 1;
  }

  removeZone() {
    if (this.isZoneSelected) {
      this.zones = this.zones.filter((_, i) => i !== this.selectedZoneIndex);
    }

    this.selectedZoneIndex--;

    if (this.selectedZoneIndex === -1) {
      this.selectedZoneIndex = this.zones.length > 0 ? 0 : null;
    }
  }
}
