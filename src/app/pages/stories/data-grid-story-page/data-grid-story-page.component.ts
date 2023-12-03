import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NBAPlayersReportComponent } from '../../../features/nba/nbaplayers-report/nbaplayers-report.component';
import { NobelPrizesReportComponent } from '../../../features/nobel/nobel-prizes-report/nobel-prizes-report.component';
import { LinkComponent } from '../../../common/ui/link/link.component';

@Component({
  selector: 'app-page-data-grid-story-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LinkComponent,
    NBAPlayersReportComponent,
    NobelPrizesReportComponent,
  ],
  templateUrl: './data-grid-story-page.component.html',
  styleUrls: ['./data-grid-story-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridStoryPageComponent {
  predefinedDatasets: string[] = ['nba', 'nobel'];
  dataset: string;

  constructor() {
    this.dataset = 'nba';
  }

  handleDatasetChange(event: Event) {
    this.dataset = (event.target as HTMLSelectElement).value;
  }
}
