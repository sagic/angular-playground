import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressStoryPageComponent } from './progress-story-page.component';
import { ProgressCircularComponent } from '../../../common/ui/progress-circular/progress-circular.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LinkComponent } from '../../../common/ui/link/link.component';

describe('ProgressStoryPageComponent', () => {
  let component: ProgressStoryPageComponent;
  let fixture: ComponentFixture<ProgressStoryPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        FormsModule,
        ProgressStoryPageComponent,
        LinkComponent,
        ProgressCircularComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressStoryPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for radius, progress, and color', () => {
    expect(component.radius).toBe(100);
    expect(component.progress).toBe(50);
    expect(component.color).toBe('red');
  });

  it('should display ProgressCircularComponent with correct inputs', () => {
    fixture.detectChanges();

    const progressCircularComponent = fixture.debugElement.query(
      By.directive(ProgressCircularComponent)
    );

    expect(progressCircularComponent).toBeTruthy();

    const progressCircularInstance =
      progressCircularComponent.componentInstance as ProgressCircularComponent;

    expect(progressCircularInstance.radius).toBe(component.radius);
    expect(progressCircularInstance.progress).toBe(component.progress);
    expect(progressCircularInstance.color).toBe(component.color);
  });

  it('should update ProgressCircularComponent inputs when component properties change', waitForAsync(() => {
    fixture.detectChanges();

    component.radius = 150;
    component.progress = 75;
    component.color = 'blue';

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const progressCircularComponent = fixture.debugElement.query(
        By.directive(ProgressCircularComponent)
      );
      const progressCircularInstance =
        progressCircularComponent.componentInstance as ProgressCircularComponent;

      expect(progressCircularInstance.radius).toBe(150);
      expect(progressCircularInstance.progress).toBe(75);
      expect(progressCircularInstance.color).toBe('blue');
    });
  }));

  it('should update the template when radius is changed', waitForAsync(() => {
    component.radius = 120;

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const progressCircularComponent = fixture.debugElement.query(
        By.directive(ProgressCircularComponent)
      );
      const progressCircularInstance =
        progressCircularComponent.componentInstance as ProgressCircularComponent;

      expect(progressCircularInstance.radius).toBe(120);
    });
  }));

  it('should update the template when progress is changed', waitForAsync(() => {
    component.progress = 30;

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const progressCircularComponent = fixture.debugElement.query(
        By.directive(ProgressCircularComponent)
      );
      const progressCircularInstance =
        progressCircularComponent.componentInstance as ProgressCircularComponent;

      expect(progressCircularInstance.progress).toBe(30);
    });
  }));
});
