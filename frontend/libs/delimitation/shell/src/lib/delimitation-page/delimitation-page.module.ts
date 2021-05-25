import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelimitationPageComponent } from './delimitation-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { DelimitationFeatureDelimitationModule } from '@gsm-geo-delimitation/delimitation/feature-delimitation';
import { GeoSearchDataAccessModule } from '@gsm-geo-delimitation/geo-search/data-access';

@NgModule({
  declarations: [DelimitationPageComponent],
  exports: [DelimitationPageComponent],
  imports: [
    CommonModule,
    DelimitationUiMapModule,
    DelimitationFeatureDelimitationModule,
    GeoSearchDataAccessModule,
  ],
})
export class DelimitationPageModule {}
