import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { TracksListModule } from '../tracks-list/tracks-list.module';
import { FabMenuModule } from '../fab-menu/fab-menu.module';

@NgModule({
  declarations: [MockGsmTracksPageComponent],
  exports: [MockGsmTracksPageComponent],
  imports: [
    CommonModule,
    DelimitationUiMapModule,
    TracksListModule,
    FabMenuModule,
  ],
})
export class MockGsmTracksPageModule {}
