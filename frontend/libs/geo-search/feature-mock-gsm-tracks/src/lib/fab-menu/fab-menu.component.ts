import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabMenuComponent {
  @Output()
  readonly saveTracks = new EventEmitter();

  @Input()
  readonly canRemoveTrack: boolean;

  @Output()
  readonly addTrack = new EventEmitter();

  @Output()
  readonly removeTrack = new EventEmitter();
}