import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NBAPlayersReportComponent } from './nbaplayers-report.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { NBAService } from '../../../api/nba/nba.service';
import { DataGridColumnComponent } from '../../../common/ui/data-grid/data-grid-column/data-grid-column.component';
import { DataGridComponent } from '../../../common/ui/data-grid/data-grid.component';

describe('NBAPlayersReportComponent', () => {
  let component: NBAPlayersReportComponent;
  let fixture: ComponentFixture<NBAPlayersReportComponent>;
  let nbaService: jasmine.SpyObj<NBAService>;

  beforeEach(waitForAsync(() => {
    nbaService = jasmine.createSpyObj('NBAService', [
      'getNBAPlayersWithStatsAndSuch',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NBAPlayersReportComponent,
        CommonModule,
        DataGridComponent,
        DataGridColumnComponent,
      ],
      providers: [{ provide: NBAService, useValue: nbaService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NBAPlayersReportComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch NBA players data on initialization', () => {
    nbaService.getNBAPlayersWithStatsAndSuch.and.returnValue(of([]));
    fixture.detectChanges();
    expect(nbaService.getNBAPlayersWithStatsAndSuch).toHaveBeenCalled();
  });
});
