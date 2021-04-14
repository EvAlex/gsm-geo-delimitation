import { NgModule } from '@angular/core';
import { MapModule } from './map/map.module';

@NgModule({
  imports: [MapModule],
  exports: [MapModule],
})
export class DelimitationUiMapModule {}
