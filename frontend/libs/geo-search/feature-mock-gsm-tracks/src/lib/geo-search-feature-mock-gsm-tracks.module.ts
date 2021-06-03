import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page/mock-gsm-tracks-page.component';
import { MockGsmTracksPageModule } from './mock-gsm-tracks-page/mock-gsm-tracks-page.module';

const routes: Routes = [
  {
    path: '',
    component: MockGsmTracksPageComponent,
  },
];

@NgModule({
  imports: [MockGsmTracksPageModule, RouterModule.forChild(routes)],
  exports: [MockGsmTracksPageModule],
})
export class GeoSearchFeatureMockGsmTracksModule {}
