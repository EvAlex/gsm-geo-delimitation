import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationFeatureNavbarModule } from '@gsm-geo-delimitation/navigation/feature-navbar';

@NgModule({
  imports: [CommonModule, NavigationFeatureNavbarModule],
  exports: [NavigationFeatureNavbarModule],
})
export class NavigationShellModule {}
