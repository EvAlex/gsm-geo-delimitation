import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'delimitation',
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
  {
    path: '',
    redirectTo: 'delimitation',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    const mockGeoSearchUrl =
      window.location.origin + '/geo-search/mock-gsm-tracks';
    console.info(
      'Мокирование результатов поиска GSM треков:\n' + mockGeoSearchUrl
    );

    const mockDelimitationUrl =
      window.location.origin + '/delimitation/mock-delimitation-result';
    console.info(
      'Мокирование результатов запуска делимитации:\n' + mockDelimitationUrl
    );
  }
}
