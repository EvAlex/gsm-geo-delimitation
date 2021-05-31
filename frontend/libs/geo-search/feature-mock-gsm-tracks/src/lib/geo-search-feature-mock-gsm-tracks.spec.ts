import { geoSearchFeatureMockGsmTracks } from './geo-search-feature-mock-gsm-tracks';

describe('geoSearchFeatureMockGsmTracks', () => {
  it('should work', () => {
    expect(geoSearchFeatureMockGsmTracks()).toEqual(
      'geo-search-feature-mock-gsm-tracks'
    );
  });
});
