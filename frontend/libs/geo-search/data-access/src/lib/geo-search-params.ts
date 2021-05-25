import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

export type GeoSearchParams = {
  dateFrom: Date;
  dateTo: Date;
  timeFrom: string;
  timeTo: string;
  areaBoundary: GeoPoint[];
};
