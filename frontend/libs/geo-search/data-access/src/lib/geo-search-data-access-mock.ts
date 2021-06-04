import { Observable } from 'rxjs';
import { GeoSearchDataAccess } from './geo-search-data-access';
import { GsmTrack } from './gsm-track';

export interface GeoSearchDataAccessMock extends GeoSearchDataAccess {
  saveTracks(tracks: GsmTrack[]): Observable<void>;
}
