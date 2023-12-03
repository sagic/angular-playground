import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCircularComponent } from '../../../common/ui/progress-circular/progress-circular.component';
import { FormsModule } from '@angular/forms';
import { LinkComponent } from '../../../common/ui/link/link.component';

@Component({
  selector: 'app-page-progress-story-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LinkComponent,
    ProgressCircularComponent,
  ],
  templateUrl: './progress-story-page.component.html',
  styleUrls: ['./progress-story-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressStoryPageComponent {
  predefinedColors: string[] = ['red', 'green', 'blue', 'yellow', 'orange'];
  radius: number;
  progress: number;
  color: string;

  constructor() {
    this.radius = 100;
    this.progress = 50;
    this.color = 'red';
  }
}
