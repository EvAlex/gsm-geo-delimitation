import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchFormValue } from '@gsm-geo-delimitation/delimitation/feature-delimitation';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';
import { GeoSearchDataAccessService } from '@gsm-geo-delimitation/geo-search/data-access';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gsm-geo-delimitation-delimitation-page',
  templateUrl: './delimitation-page.component.html',
  styleUrls: ['./delimitation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitationPageComponent implements OnInit {
  private readonly submitSearch$ = new Subject();

  searchFormValue: SearchFormValue = {
    dateFrom: null,
    dateTo: null,
    timeFrom: null,
    timeTo: null,
    areaBoundary: [],
  };

  tracks$ = this.submitSearch$.pipe(
    switchMap(() =>
      this.searchDataAccess.queryTracks({
        ...this.searchFormValue,
      })
    ),
    map((tracks) => tracks.map((track) => track.points))
  );

  isAreaSelectMode: boolean;

  selectedAreaBoundaryPointIndex: number;

  constructor(private readonly searchDataAccess: GeoSearchDataAccessService) {}

  ngOnInit(): void {}

  onAreaBoundaryChange(areaBoundary: GeoPoint[]) {
    this.searchFormValue = {
      ...this.searchFormValue,
      areaBoundary,
    };
  }

  submitSearch() {
    this.submitSearch$.next();
  }
}
