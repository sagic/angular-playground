import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NobelService } from '../../../api/nobel/nobel.service';
import { DataGridComponent } from '../../../common/ui/data-grid/data-grid.component';
import { DataGridColumnComponent } from '../../../common/ui/data-grid/data-grid-column/data-grid-column.component';

@Component({
  selector: 'uipath-nobel-prizes-report',
  standalone: true,
  imports: [CommonModule, DataGridComponent, DataGridColumnComponent],
  templateUrl: './nobel-prizes-report.component.html',
  styleUrls: ['./nobel-prizes-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NobelPrizesReportComponent {
  gridData: Observable<any[]>;
  constructor(private readonly nobelService: NobelService) {
    this.gridData = this.nobelService.getSomeFictionalNobelPrizeWinners();
  }
}
