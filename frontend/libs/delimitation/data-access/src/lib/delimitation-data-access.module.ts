import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DELIMITATION_DATA_ACCESS } from './delimitation-data-access';
import { DelimitatonDataAccessMockService } from './delimitation-data-access-mock.service';

@NgModule({
  providers: [
    {
      provide: DELIMITATION_DATA_ACCESS,
      useClass: DelimitatonDataAccessMockService,
    },
  ],
})
export class DelimitationDataAccessModule {}
