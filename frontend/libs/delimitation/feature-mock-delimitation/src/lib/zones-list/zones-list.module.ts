import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ZonesListComponent } from './zones-list.component';

@NgModule({
  declarations: [ZonesListComponent],
  exports: [ZonesListComponent],
  imports: [CommonModule, MatListModule],
})
export class ZonesListModule {}
