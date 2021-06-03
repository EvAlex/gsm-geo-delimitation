import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@gsm-geo-delimitation/delimitation/shell').then(
        (m) => m.DelimitationShellModule
      ),
  },
  {
    path: 'geo-search',
    loadChildren: () =>
      import('@gsm-geo-delimitation/geo-search/shell').then(
        (m) => m.GeoSearchShellModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
