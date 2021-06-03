import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { MatButtonModule } from '@angular/material/button';
import { TracksListModule } from '../tracks-list/tracks-list.module';

@NgModule({
  declarations: [MockGsmTracksPageComponent],
  exports: [MockGsmTracksPageComponent],
  imports: [
    CommonModule,
    DelimitationUiMapModule,
    TracksListModule,
    MatButtonModule,
  ],
})
export class MockGsmTracksPageModule {}
