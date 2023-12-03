import { Component, Input } from '@angular/core';

@Component({
  selector: 'uipath-data-grid-column',
  template: '',
  standalone: true,
})
export class DataGridColumnComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() sortable: boolean = false;
  @Input() width?: number | string;
  @Input() valueFormatter?: (value: any) => string;
}
