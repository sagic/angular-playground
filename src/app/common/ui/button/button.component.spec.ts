import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toEqual('Click me');
    expect(component.disabled).toBeFalsy();
  });

  it('should emit buttonClick event on click', () => {
    let emitted = false;
    component.buttonClick.subscribe(() => (emitted = true));

    component.onButtonClick();
    expect(emitted).toBeTruthy();
  });

  it('should not emit buttonClick event if disabled', () => {
    let emitted = false;
    component.disabled = true;
    component.buttonClick.subscribe(() => (emitted = true));

    component.onButtonClick();
    expect(emitted).toBeFalsy();
  });

  it('should update properties on input changes', () => {
    const newLabel = 'New Label';
    const newDisabled = true;

    component.label = newLabel;
    component.disabled = newDisabled;

    fixture.detectChanges();

    expect(component.label).toEqual(newLabel);
    expect(component.disabled).toEqual(newDisabled);
  });
});
