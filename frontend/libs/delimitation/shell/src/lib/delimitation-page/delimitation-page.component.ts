import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { SearchFormValue } from '@gsm-geo-delimitation/delimitation/feature-delimitation';
import {
  GeoSearchDataAccess,
  GEO_SEARCH_DATA_ACCESS,
} from '@gsm-geo-delimitation/geo-search/data-access';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';
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

  constructor(
    @Inject(GEO_SEARCH_DATA_ACCESS)
    private readonly searchDataAccess: GeoSearchDataAccess
  ) {}

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

  runDelimitation() {}
}
