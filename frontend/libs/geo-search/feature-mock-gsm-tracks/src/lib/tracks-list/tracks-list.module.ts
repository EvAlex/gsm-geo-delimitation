import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TracksListComponent } from './tracks-list.component';

@NgModule({
  declarations: [TracksListComponent],
  exports: [TracksListComponent],
  imports: [CommonModule, MatListModule],
})
export class TracksListModule {}
