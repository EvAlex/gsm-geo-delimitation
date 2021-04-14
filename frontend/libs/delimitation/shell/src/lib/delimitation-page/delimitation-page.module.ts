import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelimitationPageComponent } from './delimitation-page.component';
import { DelimitationUiMapModule } from '@gsm-geo-delimitation/delimitation/ui-map';

@NgModule({
  declarations: [DelimitationPageComponent],
  exports: [DelimitationPageComponent],
  imports: [CommonModule, DelimitationUiMapModule],
})
export class DelimitationPageModule {}
