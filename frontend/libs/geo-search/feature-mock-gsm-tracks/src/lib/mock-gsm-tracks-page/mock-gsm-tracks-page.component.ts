import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';
import {
  GeoSearchDataAccessMock,
  GEO_SEARCH_DATA_ACCESS,
} from '@gsm-geo-delimitation/geo-search/data-access';
import { combineLatest, timer } from 'rxjs';
import { map, mapTo, startWith, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'mock-gsm-tracks-page',
  templateUrl: './mock-gsm-tracks-page.component.html',
  styleUrls: ['./mock-gsm-tracks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockGsmTracksPageComponent implements OnInit {
  tracks: GeoPoint[][] = [];

  selectedTrackIndex: number = null;

  get isTrackSelected(): boolean {
    return this.selectedTrackIndex !== null;
  }

  constructor(
    @Inject(GEO_SEARCH_DATA_ACCESS)
    private readonly dataAccess: GeoSearchDataAccessMock,
    private readonly snackbar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataAccess
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
  }

  saveTracks() {
    const save$ = this.dataAccess.saveTracks(
      this.tracks.map((e) => ({ points: e }))
    );

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

  addTrack() {
    this.tracks = this.tracks.concat([[]]);
    this.selectedTrackIndex = this.tracks.length - 1;
  }

  removeTrack() {
    if (this.isTrackSelected) {
      this.tracks = this.tracks.filter((_, i) => i !== this.selectedTrackIndex);
    }

    this.selectedTrackIndex--;

    if (this.selectedTrackIndex === -1) {
      this.selectedTrackIndex = this.tracks.length > 0 ? 0 : null;
    }
  }
}
