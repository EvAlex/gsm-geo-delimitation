import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { TracksListModule } from '../tracks-list/tracks-list.module';
import { GeoSearchDataAccessModule } from '@gsm-geo-delimitation/geo-search/data-access';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedUiFabMenuModule } from '@gsm-geo-delimitation/shared/ui-fab-menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [MockGsmTracksPageComponent],
  exports: [MockGsmTracksPageComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    DelimitationUiMapModule,
    TracksListModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    SharedUiFabMenuModule,
    GeoSearchDataAccessModule,
  ],
})
export class MockGsmTracksPageModule {}
