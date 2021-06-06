import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DelimitationPageComponent } from './delimitation-page/delimitation-page.component';
import { DelimitationPageModule } from './delimitation-page/delimitation-page.module';

const routes: Routes = [
  {
    path: '',
    component: DelimitationPageComponent,
  },
  {
    path: 'mock-delimitation-result',
    loadChildren: () =>
      import(
        '@gsm-geo-delimitation/delimitation/feature-mock-delimitation'
      ).then((m) => m.DelimitationFeatureMockDelimitationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DelimitationPageModule],
})
export class DelimitationShellModule {}
