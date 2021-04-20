import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelimitationPageComponent } from './delimitation-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';
import { DelimitationFeatureDelimitationModule } from '@gsm-geo-delimitation/delimitation/feature-delimitation';

@NgModule({
  declarations: [DelimitationPageComponent],
  exports: [DelimitationPageComponent],
  imports: [
    CommonModule,
    DelimitationUiMapModule,
    DelimitationFeatureDelimitationModule,
  ],
})
export class DelimitationPageModule {}
