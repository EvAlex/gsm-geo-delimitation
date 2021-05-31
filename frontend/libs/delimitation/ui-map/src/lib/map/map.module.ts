import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map.component';
import { MapLoaderModule } from '../map-loader/map-loader.module';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [CommonModule, GoogleMapsModule, MapLoaderModule],
})
export class MapModule {}
