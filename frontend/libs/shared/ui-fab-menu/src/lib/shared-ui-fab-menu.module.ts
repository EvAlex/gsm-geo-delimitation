import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabMenuComponent } from './fab-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FabMenuComponent],
  exports: [FabMenuComponent],
})
export class SharedUiFabMenuModule {}
