import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { GeoZone } from '@gsm-geo-delimitation/delimitation/data-access';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

@Component({
  selector: 'ggd-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZonesListComponent {
  @Input()
  readonly zones: GeoZone[];

  @Input()
  selectedZoneIndex: number;

  @Output()
  readonly selectedZoneIndexChange = new EventEmitter<number>();

  onSelectionChange({
    options: [{ value: selectedZoneIndex }],
  }: MatSelectionListChange) {
    this.selectedZoneIndex = selectedZoneIndex;
    this.selectedZoneIndexChange.emit(selectedZoneIndex);
  }
}
