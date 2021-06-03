import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

@Component({
  selector: 'mock-gsm-tracks-page',
  templateUrl: './mock-gsm-tracks-page.component.html',
  styleUrls: ['./mock-gsm-tracks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockGsmTracksPageComponent {
  tracks: GeoPoint[][] = [];

  addTrack() {
    this.tracks = this.tracks.concat([[]]);
  }
}
