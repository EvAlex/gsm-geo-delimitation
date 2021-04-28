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
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

export type SearchFormValue = {
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

  isAreaSelectMode = false;

  @Input()
  selectedPointIndex: number;

  @Input()
  set value(value: SearchFormValue) {
    this.form.setValue(value, { emitEvent: false });
  }

  @Output()
  readonly valueChange = new EventEmitter<SearchFormValue>();

  @Output()
  readonly selectedPointIndexChange = new EventEmitter<number>();

  @Output()
  readonly isAreaSelectModeChange = new EventEmitter<boolean>();

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

  removePoint(index: number) {
    const currentvalue: SearchFormValue = this.form.value;
    const patch: Partial<SearchFormValue> = {
      areaBoundary: currentvalue.areaBoundary.filter((_, i) => i !== index),
    };

    this.form.patchValue(patch);
  }

  selectPoint(index: number) {
    this.selectedPointIndex = index;
    this.selectedPointIndexChange.emit(index);
  }

  isPointSelected(index: number): boolean {
    return index === this.selectedPointIndex;
  }

  toggleAreaSelectMode() {
    this.isAreaSelectMode = !this.isAreaSelectMode;
    this.isAreaSelectModeChange.emit(this.isAreaSelectMode);
  }
}
