import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FabMenuComponent } from './fab-menu.component';

@NgModule({
  declarations: [FabMenuComponent],
  exports: [FabMenuComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule],
})
export class FabMenuModule {}
