import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCircularComponent } from './progress-circular.component';

describe('ProgressCircularComponent', () => {
  let component: ProgressCircularComponent;
  let fixture: ComponentFixture<ProgressCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressCircularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.progress).toEqual(0);
    expect(component.radius).toEqual(50);
    expect(component.color).toEqual('white');
  });

  it('should calculate diameter correctly', () => {
    expect(component.diameter).toEqual(100);
  });

  it('should calculate dashArray correctly', () => {
    const expectedCircumference =
      component.radius *
      (component.innerCirclePercent - component.fixSVGEdgeCut) *
      2 *
      Math.PI;
    expect(component.dashArray).toEqual(
      `${expectedCircumference} ${expectedCircumference}`
    );
  });

  it('should calculate dashOffset correctly', () => {
    component.progress = 50;
    const expectedCircumference =
      component.radius *
      (component.innerCirclePercent - component.fixSVGEdgeCut) *
      2 *
      Math.PI;
    const expectedDashOffset = `${
      expectedCircumference - (component.progress / 100) * expectedCircumference
    }`;
    expect(component.dashOffset).toEqual(expectedDashOffset);
  });
});
