import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { TracksListModule } from '../tracks-list/tracks-list.module';
import { FabMenuModule } from '../fab-menu/fab-menu.module';
import { GeoSearchDataAccessModule } from '@gsm-geo-delimitation/geo-search/data-access';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [MockGsmTracksPageComponent],
  exports: [MockGsmTracksPageComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    DelimitationUiMapModule,
    TracksListModule,
    FabMenuModule,
    GeoSearchDataAccessModule,
  ],
})
export class MockGsmTracksPageModule {}
