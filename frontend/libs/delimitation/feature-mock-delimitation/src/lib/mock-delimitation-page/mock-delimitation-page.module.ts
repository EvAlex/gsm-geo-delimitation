import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDelimitationPageComponent } from './mock-delimitation-page.component';

@NgModule({
  declarations: [MockDelimitationPageComponent],
  exports: [MockDelimitationPageComponent],
  imports: [CommonModule],
})
export class MockDelimitationPageModule {}
