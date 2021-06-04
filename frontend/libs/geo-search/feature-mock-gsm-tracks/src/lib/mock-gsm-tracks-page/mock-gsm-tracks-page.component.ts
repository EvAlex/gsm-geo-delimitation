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

  selectedTrackIndex: number = null;

  get isTrackSelected(): boolean {
    return this.selectedTrackIndex !== null;
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

    if (this.selectedTrackIndex === -1 && this.tracks.length > 0) {
      this.selectedTrackIndex = 0;
    }
  }
}
