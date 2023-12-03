import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uipath-progress-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-circular.component.html',
  styleUrls: ['./progress-circular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircularComponent {
  @Input() progress: number = 0;
  @Input() radius: number = 50;
  @Input() color: string = 'white';

  innerCirclePercent = 0.8;
  fixSVGEdgeCut = 0.01;

  get diameter(): number {
    return this.radius * 2;
  }

  get dashArray(): string {
    const circumference =
      this.radius *
      (this.innerCirclePercent - this.fixSVGEdgeCut) *
      2 *
      Math.PI;
    return `${circumference} ${circumference}`;
  }

  get dashOffset(): string {
    const circumference =
      this.radius *
      (this.innerCirclePercent - this.fixSVGEdgeCut) *
      2 *
      Math.PI;
    return `${circumference - (this.progress / 100) * circumference}`;
  }
}
