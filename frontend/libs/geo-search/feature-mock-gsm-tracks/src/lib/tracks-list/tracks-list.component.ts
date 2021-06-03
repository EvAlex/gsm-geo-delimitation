import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
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
}
