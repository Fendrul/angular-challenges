import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-header]" />

    <section>
      @for (item of list(); track item) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="added.emit()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input.required<T[]>();
  readonly customClass = input('');
  added = output<void>();

  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;
}
