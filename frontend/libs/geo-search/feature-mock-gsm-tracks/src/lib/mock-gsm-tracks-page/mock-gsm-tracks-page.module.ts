import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page.component';

@NgModule({
  declarations: [MockGsmTracksPageComponent],
  exports: [MockGsmTracksPageComponent],
  imports: [CommonModule],
})
export class MockGsmTracksPageModule {}
