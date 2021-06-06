import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelimitationPageComponent } from './delimitation-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { DelimitationFeatureDelimitationModule } from '@gsm-geo-delimitation/delimitation/feature-delimitation';
import { GeoSearchDataAccessModule } from '@gsm-geo-delimitation/geo-search/data-access';
import { DelimitationDataAccessModule } from '@gsm-geo-delimitation/delimitation/data-access';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DelimitationPageComponent],
  exports: [DelimitationPageComponent],
  imports: [
    CommonModule,
    DelimitationUiMapModule,
    DelimitationFeatureDelimitationModule,
    GeoSearchDataAccessModule,
    DelimitationDataAccessModule,
    MatButtonModule,
  ],
})
export class DelimitationPageModule {}
