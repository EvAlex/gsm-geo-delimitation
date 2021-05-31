import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { GeoPoint } from '@gsm-geo-delimitation/shared/util-geolocation';

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
  };

  @Input()
  readonly isAreaSelectMode: boolean;

  private _selectedAreaBoundaryPointIndex: number;

  @Input()
  set selectedAreaBoundaryPointIndex(value: number) {
    this._selectedAreaBoundaryPointIndex = value;
    this.updateMarkerOptions();
  }

  @Output()
  readonly selectedAreaBoundaryPointIndexChange = new EventEmitter<number>();

  @Input()
  readonly tracks: GeoPoint[][];

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

  onMapClick(event: google.maps.MapMouseEvent) {
    if (this.isAreaSelectMode) {
      this.areaMarkerPoints = this.areaMarkerPoints.concat([
        event.latLng.toJSON(),
      ]);
      this.areaPolygonPoints = this.areaMarkerPoints.slice();
      this.updateMarkerOptions();
      this.areaBoundaryChange.emit(this.areaMarkerPoints);
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
