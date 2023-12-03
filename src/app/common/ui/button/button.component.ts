import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Yeah, it's a very simple button implementation.
// Most of this app is not ready for production.

@Component({
  selector: 'uipath-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label = 'Click me';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
