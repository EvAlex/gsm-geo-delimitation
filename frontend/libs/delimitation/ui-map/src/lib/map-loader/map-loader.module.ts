import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLoaderComponent } from './map-loader.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [MapLoaderComponent],
  exports: [MapLoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class MapLoaderModule {}
