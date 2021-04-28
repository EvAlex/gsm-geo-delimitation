import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchFormValue } from '@gsm-geo-delimitation/delimitation/feature-delimitation';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

@Component({
  selector: 'gsm-geo-delimitation-delimitation-page',
  templateUrl: './delimitation-page.component.html',
  styleUrls: ['./delimitation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitationPageComponent implements OnInit {
  searchFormValue: SearchFormValue = {
    dateFrom: null,
    dateTo: null,
    areaBoundary: [],
  };

  isAreaSelectMode: boolean;

  constructor() {}

  ngOnInit(): void {}

  onAreaBoundaryChange(areaBoundary: GeoPoint[]) {
    this.searchFormValue = {
      ...this.searchFormValue,
      areaBoundary,
    };
  }
}
