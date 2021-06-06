import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';
import { GeoZone } from '@gsm-geo-delimitation/delimitation/data-access';

@Component({
  selector: 'gsm-geo-delimitation-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  readonly options: google.maps.MapOptions = {
    center: { lat: 55.755833, lng: 37.617222 },
    zoom: 12,
    clickableIcons: false,
    disableDefaultUI: true,
  };

  @Input()
  readonly isAreaSelectMode: boolean;

  @Input()
  readonly isTrackDrawMode: boolean;

  private _selectedAreaBoundaryPointIndex: number;

  @Input()
  set selectedAreaBoundaryPointIndex(value: number) {
    this._selectedAreaBoundaryPointIndex = value;
    this.updateMarkerOptions();
  }

  @Output()
  readonly selectedAreaBoundaryPointIndexChange = new EventEmitter<number>();

  @Input()
  tracks: GeoPoint[][];

  @Input()
  selectedTrackIndex: number;

  @Output()
  readonly tracksChange = new EventEmitter<GeoPoint[][]>();

  readonly tracksOptions: google.maps.PolylineOptions = {
    strokeWeight: 2,
    strokeColor: '#673ab7',
    // strokeOpacity: 0.82,
  };

  areaMarkerPoints: GeoPoint[];

  areaPolygonPoints: GeoPoint[];

  @Input()
  set areaBoundary(points: GeoPoint[]) {
    this.areaMarkerPoints = points.slice();
    this.areaPolygonPoints = points.slice();
    this.updateMarkerOptions();
  }

  @Output()
  readonly areaBoundaryChange = new EventEmitter<GeoPoint[]>();

  areaBoundaryMarkerOptions: google.maps.MarkerOptions[];

  readonly areaPolygonOptions: google.maps.PolygonOptions = {
    strokeWeight: 1,
    strokeColor: '#673ab7',
    strokeOpacity: 0.82,
    fillColor: '#673ab7',
    fillOpacity: 0.32,
    clickable: false,
  };

  @Input()
  isZoneDrawMode: boolean;

  @Input()
  zones: GeoZone[];

  @Output()
  readonly zonesChange = new EventEmitter<GeoZone[]>();

  @Input()
  selectedZoneIndex: number;

  private readonly zoneOptions: google.maps.RectangleOptions = {
    editable: true,
    draggable: true,
    strokeColor: 'red',
    fillColor: 'red',
    fillOpacity: 0.2,
  };

  private readonly zoneEllipseOptions: google.maps.PolygonOptions = {
    strokeColor: 'black',
    fillColor: 'black',
    fillOpacity: 0.36,
  };

  onMapClick(event: google.maps.MapMouseEvent) {
    if (this.isAreaSelectMode) {
      this.selectArea(event);
    } else if (this.isTrackDrawMode) {
      this.drawTrack(event);
    } else if (this.isZoneDrawMode) {
      this.drawZone(event);
    }
  }

  onAreaBoundaryMarkerPositionChanged(value: GeoPoint, index: number) {
    this.areaPolygonPoints = this.areaPolygonPoints.map((e, i) =>
      i === index ? value : e
    );
  }

  onAreaBoundaryMarkerDragEnd() {
    this.areaMarkerPoints = this.areaPolygonPoints.slice();
    this.areaBoundaryChange.emit(this.areaMarkerPoints);
  }

  onAreaBoundaryMarkerClick(index: number) {
    this._selectedAreaBoundaryPointIndex = index;
    this.selectedAreaBoundaryPointIndexChange.emit(index);
  }

  private selectArea(event: google.maps.MapMouseEvent) {
    this.areaMarkerPoints = this.areaMarkerPoints.concat([
      event.latLng.toJSON(),
    ]);
    this.areaPolygonPoints = this.areaMarkerPoints.slice();
    this.updateMarkerOptions();
    this.areaBoundaryChange.emit(this.areaMarkerPoints);
  }

  private drawTrack(event: google.maps.MapMouseEvent) {
    if (this.tracks?.length || 0 > 0) {
      const index =
        this.selectedTrackIndex >= 0
          ? this.selectedTrackIndex
          : this.tracks.length - 1;

      this.tracks[index] = this.tracks[index].concat([event.latLng.toJSON()]);
      this.tracksChange.emit(this.tracks);
    }
  }

  private drawZone(event: google.maps.MapMouseEvent) {
    if (!Array.isArray(this.zones) || !this.zones[this.selectedZoneIndex]) {
      return;
    }

    const zone = this.zones[this.selectedZoneIndex];
    const isTopLeftSet =
      typeof zone.bounds.west === 'number' &&
      typeof zone.bounds.north === 'number';
    const isBottomRightSet =
      typeof zone.bounds.east === 'number' &&
      typeof zone.bounds.south === 'number';

    if (!isTopLeftSet && !isBottomRightSet) {
      this.zones = this.zones.map((e, i) =>
        i === this.selectedZoneIndex
          ? {
              ...zone,
              bounds: {
                ...zone.bounds,
                west: event.latLng.lng(),
                north: event.latLng.lat(),
              },
            }
          : e
      );
      this.zonesChange.emit(this.zones);
    } else if (isTopLeftSet && !isBottomRightSet) {
      this.zones = this.zones.map((e, i) =>
        i === this.selectedZoneIndex
          ? {
              ...zone,
              bounds: {
                ...zone.bounds,
                east: event.latLng.lng(),
                south: event.latLng.lat(),
              },
            }
          : e
      );
      this.zonesChange.emit(this.zones);
    }
  }

  isZoneSet(zone: GeoZone): boolean {
    const isTopLeftSet =
      typeof zone.bounds.west === 'number' &&
      typeof zone.bounds.north === 'number';
    const isBottomRightSet =
      typeof zone.bounds.east === 'number' &&
      typeof zone.bounds.south === 'number';

    return isTopLeftSet && isBottomRightSet;
  }

  getZoneOptions(index: number) {
    return this.selectedZoneIndex === index
      ? this.zoneOptions
      : {
          ...this.zoneOptions,
          fillOpacity: 0,
          editable: false,
          draggable: false,
        };
  }

  onZoneBoundsChanged(bounds: google.maps.LatLngBounds, zoneIndex) {
    const zone = this.zones[this.selectedZoneIndex];

    if (!zone) {
      return;
    }

    const newBounds = {
      north: bounds.getNorthEast().lat(),
      east: bounds.getNorthEast().lng(),
      south: bounds.getSouthWest().lat(),
      west: bounds.getSouthWest().lng(),
    };
    const isChanged =
      Math.max(
        ...[
          zone.bounds.north - newBounds.north,
          zone.bounds.east - newBounds.east,
          zone.bounds.south - newBounds.south,
          zone.bounds.west - newBounds.west,
        ].map(Math.abs)
      ) > 1e-6;

    if (isChanged) {
      this.zones = this.zones.map((e, i) =>
        i === zoneIndex ? { ...e, bounds: newBounds } : e
      );
      this.zonesChange.emit(this.zones);
    }
  }

  getZoneEllipsePath(
    zone: GeoZone
  ): google.maps.LatLngLiteral[] | google.maps.LatLng[] {
    /* const ac = (zone.east - zone.west) / 2;
    const bc = (zone.north - zone.south) / 2;
    const a = Math.max(ac, bc);
    const b = Math.min(ac, bc);
    const c = Math.sqrt(a * a - b * b);
    const e = c / a; //Math.sqrt(1 - (a * a) / b / b);
    const rp = a * (1 - e);
    const ra = a * (1 + e);
    const center = {
      lat: zone.south + b,
      lng: zone.west + a,
    };

    const radians = Math.PI / 180;
    const result: google.maps.LatLngLiteral[] = [];

    for (
      var angle = 1;
      angle <= 360;
      angle++ //360 points
    ) {
      var py = center.lat + ra * Math.cos(radians * angle);

      var px = center.lng + rp * Math.sin(radians * angle);

      result.push({ lat: py, lng: px });
    }

    return result; */

    //  NOTE: maps api still loading
    if (!google.maps.geometry) {
      return [];
    }

    const bounds = new google.maps.LatLngBounds(
      { lat: zone.bounds.south, lng: zone.bounds.west },
      { lat: zone.bounds.north, lng: zone.bounds.east }
    );
    var major_axis =
      google.maps.geometry.spherical.computeDistanceBetween(
        bounds.getNorthEast(),
        new google.maps.LatLng(
          bounds.getSouthWest().lat(),
          bounds.getNorthEast().lng()
        )
      ) / 2;
    var minor_axis =
      google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(
          bounds.getCenter().lat(),
          bounds.getSouthWest().lng()
        ),
        new google.maps.LatLng(
          bounds.getCenter().lat(),
          bounds.getNorthEast().lng()
        )
      ) / 2;

    // === Ellipse ===
    var point = bounds.getCenter(); // new google.maps.LatLng(43,-78);
    return drawEllipse(point, major_axis, minor_axis, 0);
  }

  getZoneEllipseOptions(zone: GeoZone): google.maps.PolygonOptions {
    return {
      ...this.zoneEllipseOptions,
      fillColor: zone.color,
    };
  }

  private updateMarkerOptions() {
    this.areaBoundaryMarkerOptions = this.areaMarkerPoints.map((_, i) =>
      i === this._selectedAreaBoundaryPointIndex
        ? this.createMarkerOptionsForSelected(i)
        : this.createMarkerOptions(i)
    );
  }

  private createMarkerOptions(index: number): google.maps.MarkerOptions {
    return <google.maps.MarkerOptions>{
      draggable: true,
      clickable: true,
      label: String(index + 1),
      icon: undefined,
    };
  }

  private createMarkerOptionsForSelected(
    index: number
  ): google.maps.MarkerOptions {
    return <google.maps.MarkerOptions>{
      draggable: true,
      clickable: false,
      label: <google.maps.MarkerLabel>{
        text: String(index + 1),
        color: 'white',
      },
      icon: <google.maps.Icon>{
        url: '/assets/marker-selected.png',
        scaledSize: new google.maps.Size(27, 43),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(14, 43),
        labelOrigin: new google.maps.Point(14, 15),
      },
    };
  }
}

function drawEllipse(point, r1, r2, rotation = 0): google.maps.LatLng[] {
  return drawShape(point, r1, r2, r1, r2, rotation, 360);
}

function drawShape(
  point,
  r1,
  r2,
  r3,
  r4,
  rotation,
  vertexCount,
  tilt = 0
): google.maps.LatLng[] {
  var rot = (-rotation * Math.PI) / 180;
  var points: google.maps.LatLng[] = [];
  var latConv =
    google.maps.geometry.spherical.computeDistanceBetween(
      point,
      new google.maps.LatLng(point.lat() + 0.1, point.lng())
    ) * 10;
  var lngConv =
    google.maps.geometry.spherical.computeDistanceBetween(
      point,
      new google.maps.LatLng(point.lat(), point.lng() + 0.1)
    ) * 10;
  var step = 360 / vertexCount || 10;

  var flop = -1;
  if (tilt) {
    var I1 = 180 / vertexCount;
  } else {
    var I1 = 0;
  }
  for (var i = I1; i <= 360.001 + I1; i += step) {
    var r1a = flop ? r1 : r3;
    var r2a = flop ? r2 : r4;
    flop = -1 - flop;
    var y = r1a * Math.cos((i * Math.PI) / 180);
    var x = r2a * Math.sin((i * Math.PI) / 180);
    var lng = (x * Math.cos(rot) - y * Math.sin(rot)) / lngConv;
    var lat = (y * Math.cos(rot) + x * Math.sin(rot)) / latConv;

    points.push(new google.maps.LatLng(point.lat() + lat, point.lng() + lng));
  }
  return points;
}
