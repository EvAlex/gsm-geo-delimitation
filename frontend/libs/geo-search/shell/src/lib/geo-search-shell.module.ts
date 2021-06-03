import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mock-gsm-tracks',
    loadChildren: () =>
      import('@gsm-geo-delimitation/geo-search/feature-mock-gsm-tracks').then(
        (m) => m.GeoSearchFeatureMockGsmTracksModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class GeoSearchShellModule {}
