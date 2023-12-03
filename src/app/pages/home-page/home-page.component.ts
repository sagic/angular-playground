import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '../../common/ui/link/link.component';
import { SoundService } from '../../common/sound/sound.service';
import { ButtonComponent } from '../../common/ui/button/button.component';

@Component({
  selector: 'app-page-home-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LinkComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(readonly soundService: SoundService) {}

  handleStartClick(): void {
    this.soundService.playLoop('bg');
  }
}
