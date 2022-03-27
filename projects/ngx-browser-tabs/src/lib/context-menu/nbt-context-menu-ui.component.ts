import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-browser-tab-context-menu',
  templateUrl: './nbt-context-menu-ui.component.html',
  styleUrls: ['./nbt-context-menu-ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbtContextMenuUiComponent {

  @Input() positionX: number;
  @Input() positionY: number;
  @Input() show: boolean;

  @Input() closeOtherEnabled: boolean;
  @Input() closeToRightEnabled: boolean;

  @Output() add = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() closeToRight = new EventEmitter<void>();
  @Output() closeOther = new EventEmitter<void>();

}
