import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

@Component({
  selector: 'tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksListComponent {
  @Input()
  readonly tracks: GeoPoint[][];

  @Output()
  readonly tracksChange = new EventEmitter<GeoPoint[][]>();

  @Input()
  selectedTrackIndex: number;

  @Output()
  readonly selectedTrackIndexChange = new EventEmitter<number>();

  onSelectionChange({
    options: [{ value: selectedTrackIndex }],
  }: MatSelectionListChange) {
    this.selectedTrackIndex = selectedTrackIndex;
    this.selectedTrackIndexChange.emit(selectedTrackIndex);
  }
}
