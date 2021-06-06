import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDelimitationPageComponent } from './mock-delimitation-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedUiFabMenuModule } from '@gsm-geo-delimitation/shared/ui-fab-menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DelimitationDataAccessModule } from '@gsm-geo-delimitation/delimitation/data-access';
import { ZonesListModule } from '../zones-list/zones-list.module';

@NgModule({
  declarations: [MockDelimitationPageComponent],
  exports: [MockDelimitationPageComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    DelimitationUiMapModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    SharedUiFabMenuModule,
    DelimitationDataAccessModule,
    ZonesListModule,
  ],
})
export class MockDelimitationPageModule {}
