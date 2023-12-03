import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { DataGridStoryPageComponent } from './data-grid-story-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LinkComponent } from '../../../common/ui/link/link.component';
import { NBAPlayersReportComponent } from '../../../features/nba/nbaplayers-report/nbaplayers-report.component';
import { NobelPrizesReportComponent } from '../../../features/nobel/nobel-prizes-report/nobel-prizes-report.component';

describe('DataGridStoryPageComponent', () => {
  let component: DataGridStoryPageComponent;
  let fixture: ComponentFixture<DataGridStoryPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        FormsModule,
        DataGridStoryPageComponent,
        LinkComponent,
        NBAPlayersReportComponent,
        NobelPrizesReportComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridStoryPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default value for dataset', () => {
    expect(component.dataset).toBe('nba');
  });

  it('should update dataset value when handleDatasetChange is called', fakeAsync(() => {
    expect(component.dataset).toBe('nba');

    const select: HTMLSelectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement;

    expect(select).toBeDefined();

    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBeGreaterThan(1);

    select.value = 'nobel';
    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    tick(1000);

    expect(component.dataset).toBe('nobel');
  }));
});
