import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortOrder } from './data-grid.types';
import { ColumnDef } from './data-grid-column/data-grid-column.types';
import { ButtonComponent } from '../button/button.component';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { SoundService } from '../../sound/sound.service';

@Component({
  selector: 'uipath-data-grid',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent<T extends Record<string, any>>
  implements OnInit, AfterContentInit
{
  @ContentChildren(DataGridColumnComponent)
  columnsList!: QueryList<DataGridColumnComponent>;

  @Input() sortable = false;
  @Input() pagination = false;
  @Input() set data(value: Observable<T[]> | T[] | null) {
    if (!value) {
      this.rowDataSubject.next([]);
    } else if (Array.isArray(value)) {
      this.rowDataSubject.next(value);
    } else {
      value.pipe().subscribe((arr) => {
        this.rowDataSubject.next(Array.from(arr));
      });
    }
  }

  rowDataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  rowData: T[] = [];
  sortedData: T[] = [];
  columns: ColumnDef[] = [];

  // sorting
  sortColumn: string | null = null;
  sortOrder = SortOrder.Ascending;

  // pagination
  currentPage = 1;
  pageSize = 10;
  pageSizes = [7, 10, 21, 33, 88];

  constructor(
    private cdr: ChangeDetectorRef,
    private readonly soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.rowDataSubject.subscribe((arr) => {
      this.rowData = arr;
      this.sortColumn = null;
      this.currentPage = 1;

      if (!this.columns.length && this.rowData.length) {
        // in case the user didnt add columns as content children we try to extract them for the data
        this.updateColumnsFromData();
      }
      this.applySorting();
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit() {
    this.updateColumnsFromContentChildren();
  }

  updateColumnsFromContentChildren() {
    this.columns = this.columnsList.map((column) => ({
      id: column.id,
      label: column.label,
      sortable: column.sortable,
      width: column.width,
      valueFormatter: column.valueFormatter,
    }));
  }

  updateColumnsFromData() {
    const firstItem = this.rowData[0] || {};
    const columns = Object.keys(firstItem).map<ColumnDef>((id) => ({
      id,
      label: id,
      sortable: this.sortable,
    }));
    this.columns = columns;
  }

  applySorting() {
    if (!this.rowData || !this.rowData.length) {
      this.sortedData = [];
      return;
    }

    if (!this.sortable || !this.sortColumn) {
      this.sortedData = [...this.rowData];
      return;
    }

    const column = this.sortColumn;
    const order = this.sortOrder;
    const sorted = [...this.rowData];
    sorted.sort((a, b) => {
      let val = 0;
      if (a[column] > b[column]) {
        val = 1;
      } else if (a[column] < b[column]) {
        val = -1;
      }
      return order === 'desc' ? -val : val;
    });
    this.sortedData = sorted;
  }

  get pageData() {
    if (!this.pagination) {
      return this.sortedData;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.sortedData.slice(start, end);
  }

  get numOfPages() {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }

  get numOfItems() {
    return this.sortedData.length;
  }

  onHeaderClick(column: ColumnDef) {
    if (this.sortable) {
      this.soundService.play('fx2');
      if (column.id === this.sortColumn) {
        this.sortOrder =
          this.sortOrder === SortOrder.Ascending
            ? SortOrder.Descending
            : SortOrder.Ascending;
      } else {
        this.sortColumn = column.id;
        this.sortOrder = SortOrder.Ascending;
      }
      this.currentPage = 1;
      this.applySorting();
      this.cdr.markForCheck();
    }
  }

  changePage(offset: number) {
    this.currentPage += offset;
    this.soundService.play(offset > 0 ? 'fx3' : 'fx1');
  }

  changePageSize(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.cdr.markForCheck();
  }
}
