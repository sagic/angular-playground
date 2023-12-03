import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SoundService } from '../../sound/sound.service';

@Component({
  selector: 'uipath-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() href = '/';
  @Input() label = 'Click me';

  constructor(
    private readonly router: Router,
    private readonly soundService: SoundService
  ) {}

  handleLink() {
    this.router.navigateByUrl(this.href);
    this.soundService.play(Math.random() > 0.5 ? 'fx7' : 'fx6');
  }
}
