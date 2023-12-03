import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';
import { SortOrder } from './data-grid.types';
import { of } from 'rxjs';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { SoundService } from '../../sound/sound.service';

type TestDataType = Record<string, any>;

describe('DataGridComponent', () => {
  let component: DataGridComponent<TestDataType>;
  let fixture: ComponentFixture<DataGridComponent<TestDataType>>;
  let soundServiceMock: jasmine.SpyObj<SoundService>;

  beforeEach(async () => {
    soundServiceMock = jasmine.createSpyObj('SoundService', [
      'preloadSound',
      'play',
      'playLoop',
      'stopLoop',
    ]);

    await TestBed.configureTestingModule({
      imports: [DataGridComponent],
      providers: [{ provide: SoundService, useValue: soundServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent<TestDataType>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data input', () => {
    it('should handle data input as observable', fakeAsync(() => {
      const data = [
        { id: 1, name: 'Mycroft Holmes' },
        { id: 2, name: 'Sherlock Holmes' },
      ];
      component.data = of(data);

      tick();

      expect(component.rowData).toEqual(data);
    }));

    it('should handle data input as array', fakeAsync(() => {
      const data = [
        { id: 1, name: 'Mycroft Holmes' },
        { id: 2, name: 'Sherlock Holmes' },
      ];
      component.data = data;

      tick();

      expect(component.rowData).toEqual(data);
    }));

    it('should handle data input as null', fakeAsync(() => {
      const data = null;
      component.data = data;

      tick();

      expect(component.rowData).toEqual([]);
    }));
  });

  describe('columns', () => {
    it('should update columns from content children', fakeAsync(() => {
      const columns = [
        {
          id: 'id',
          label: 'ID',
          sortable: true,
          width: undefined,
          valueFormatter: undefined,
        },
        {
          id: 'name',
          label: 'Name',
          sortable: true,
          width: undefined,
          valueFormatter: undefined,
        },
      ];

      component.columnsList.reset(
        columns.map((column) => {
          const columnComponent = new DataGridColumnComponent();
          Object.assign(columnComponent, column);
          return columnComponent;
        })
      );

      component.ngAfterContentInit();

      expect(component.columns).toEqual(columns);
    }));

    it('should update columns from data if content children not available', fakeAsync(() => {
      const data = [
        { id: 1, name: 'Mycroft Holmes' },
        { id: 2, name: 'Sherlock Holmes' },
      ];
      component.data = of(data);

      tick();

      expect(component.columns.length).toBeGreaterThan(0);
    }));
  });

  describe('sorting', () => {
    it('should handle sorting', () => {
      const data = [
        { id: 2, name: 'Sherlock Holmes' },
        { id: 1, name: 'Mycroft Holmes' },
      ];
      component.data = of(data);
      component.sortable = true;

      component.onHeaderClick({
        id: 'id',
        label: 'ID',
        sortable: true,
      });

      expect(component.sortColumn).toBe('id');
      expect(component.sortOrder).toBe(SortOrder.Ascending);
    });

    it('should handle header click with sorting', () => {
      const data = [
        { id: 2, name: 'Sherlock Holmes' },
        { id: 1, name: 'Mycroft Holmes' },
        { id: 3, name: 'Enola Holmes' },
      ];

      const sorted = [
        { id: 1, name: 'Mycroft Holmes' },
        { id: 2, name: 'Sherlock Holmes' },
        { id: 3, name: 'Enola Holmes' },
      ];

      component.data = of(data);
      component.sortable = true;

      const columnDef = { id: 'id', label: 'ID', sortable: true };

      component.onHeaderClick(columnDef);

      expect(component.sortColumn).toBe('id');
      expect(component.sortOrder).toBe(SortOrder.Ascending);
      expect(component.sortedData).toEqual(sorted);

      component.onHeaderClick(columnDef);

      expect(component.sortColumn).toBe('id');
      expect(component.sortOrder).toBe(SortOrder.Descending);
    });
  });

  describe('pagination', () => {
    it('should handle pagination', () => {
      const data = Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
      }));
      component.data = of(data);
      component.pagination = true;
      component.pageSize = 5;

      component.changePage(1);

      expect(component.currentPage).toBe(2);
      expect(component.numOfItems).toBe(15);
    });

    it('should have valid page data', () => {
      const data = Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
      }));
      component.data = of(data);
      component.pagination = true;
      component.pageSize = 5;

      expect(component.pageData).toEqual(component.sortedData.slice(0, 5));

      component.changePage(1);

      expect(component.pageData).toEqual(component.sortedData.slice(5, 10));
    });

    it('should change page size', () => {
      const data = Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
      }));
      component.data = of(data);
      component.pagination = true;

      expect(component.numOfPages).toBe(2);

      component.changePageSize({ target: { value: '5' } } as any);

      expect(component.pageSize).toBe(5);
      expect(component.currentPage).toBe(1);
      expect(component.numOfPages).toBe(3);
    });
  });
});
