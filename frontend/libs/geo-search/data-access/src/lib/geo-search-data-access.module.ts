import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GEO_SEARCH_DATA_ACCESS } from './geo-search-data-access';
import { GeoSearchDataAccessMockService } from './geo-search-data-access-mock.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: GEO_SEARCH_DATA_ACCESS,
      useClass: GeoSearchDataAccessMockService,
    },
  ],
})
export class GeoSearchDataAccessModule {}
