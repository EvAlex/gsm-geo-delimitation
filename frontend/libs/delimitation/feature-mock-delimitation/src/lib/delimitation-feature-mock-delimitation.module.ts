import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MockDelimitationPageModule } from './mock-delimitation-page/mock-delimitation-page.module';
import { MockDelimitationPageComponent } from './mock-delimitation-page/mock-delimitation-page.component';

const routes: Routes = [
  {
    path: '',
    component: MockDelimitationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MockDelimitationPageModule],
})
export class DelimitationFeatureMockDelimitationModule {}
