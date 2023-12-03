import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridColumnComponent } from './data-grid-column.component';

describe('DataGridColumnComponent', () => {
  let component: DataGridColumnComponent;
  let fixture: ComponentFixture<DataGridColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.id).toBe('');
    expect(component.label).toBe('');
    expect(component.sortable).toBe(false);
    expect(component.width).toBeUndefined();
    expect(component.valueFormatter).toBeUndefined();
  });

  it('should set input values', () => {
    component.id = 'testId';
    component.label = 'Test Label';
    component.sortable = true;
    component.width = 100;
    component.valueFormatter = (value: any) => `Formatted: ${value}`;

    fixture.detectChanges();

    expect(component.id).toBe('testId');
    expect(component.label).toBe('Test Label');
    expect(component.sortable).toBe(true);
    expect(component.width).toBe(100);
    expect(component.valueFormatter).toBeDefined();
  });
});
