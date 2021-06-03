import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mock-gsm-tracks-page',
  templateUrl: './mock-gsm-tracks-page.component.html',
  styleUrls: ['./mock-gsm-tracks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockGsmTracksPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
