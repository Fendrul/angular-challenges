import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <button (click)="deleted.emit()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ListItemComponent {
  deleted = output();
}
