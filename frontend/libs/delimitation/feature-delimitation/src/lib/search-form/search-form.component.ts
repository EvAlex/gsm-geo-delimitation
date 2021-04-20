import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type GeoPoint = {
  lat: number;
  lng: number;
};

type SearchFormValue = {
  dateFrom: Date;
  dateTo: Date;
  areaBoundary: GeoPoint[];
};

@Component({
  selector: 'gsm-geo-delimitation-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  readonly form: FormGroup;

  @Input()
  set value(value: SearchFormValue) {
    this.form.setValue(value, { emitEvent: false });
  }

  @Output()
  readonly valueChange = new EventEmitter<SearchFormValue>();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      dateFrom: [],
      dateTo: [],
      areaBoundary: [
        [
          { lat: 3, lng: 4 },
          { lat: 5, lng: 6 },
          { lat: 7, lng: 8 },
        ],
      ],
    });
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.valueChange.next(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  removePoint(point, index) {
    debugger;
  }

  onPointSelected(point, index, isSelected) {
    debugger;
  }
}
