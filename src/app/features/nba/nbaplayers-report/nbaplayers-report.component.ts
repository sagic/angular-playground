import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../../../common/ui/data-grid/data-grid.component';
import { DataGridColumnComponent } from '../../../common/ui/data-grid/data-grid-column/data-grid-column.component';
import { Observable } from 'rxjs';
import { NBAService } from '../../../api/nba/nba.service';

@Component({
  selector: 'uipath-nbaplayers-report',
  standalone: true,
  imports: [CommonModule, DataGridComponent, DataGridColumnComponent],
  templateUrl: './nbaplayers-report.component.html',
  styleUrls: ['./nbaplayers-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NBAPlayersReportComponent {
  gridData: Observable<any[]>;
  constructor(private readonly nbaService: NBAService) {
    this.gridData = this.nbaService.getNBAPlayersWithStatsAndSuch();
  }

  percentFormatter(value: number) {
    return `${(100 * value).toFixed(2)}%`;
  }
}
