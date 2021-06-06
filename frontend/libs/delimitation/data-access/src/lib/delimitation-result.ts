export type GeoZone = {
  color: string;
  bounds: {
    /**
     * East longitude in degrees. Values outside the range [-180, 180] will be wrapped to the range [-180, 180]. For
     * example, a value of -190 will be converted to 170. A value of 190 will be converted to -170. This reflects
     * the fact that longitudes wrap around the globe.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral.east Maps JavaScript API}
     */
    east: number;

    /**
     * North latitude in degrees. Values will be clamped to the range [-90, 90]. This means that if the value
     * specified is less than -90, it will be set to -90. And if the value is greater than 90, it will be set to 90.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral.north Maps JavaScript API}
     */
    north: number;

    /**
     * South latitude in degrees. Values will be clamped to the range [-90, 90]. This means that if the value
     * specified is less than -90, it will be set to -90. And if the value is greater than 90, it will be set to 90.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral.south Maps JavaScript API}
     */
    south: number;

    /**
     * West longitude in degrees. Values outside the range [-180, 180] will be wrapped to the range [-180, 180]. For
     * example, a value of -190 will be converted to 170. A value of 190 will be converted to -170. This reflects
     * the fact that longitudes wrap around the globe.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral.west Maps JavaScript API}
     */
    west: number;
  };
};

export type DelimitationResult = {
  zones: GeoZone[];
};
