import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gsm-geo-delimitation-mock-delimitation-page',
  templateUrl: './mock-delimitation-page.component.html',
  styleUrls: ['./mock-delimitation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockDelimitationPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
