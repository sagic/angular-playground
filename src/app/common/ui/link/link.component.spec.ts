import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkComponent } from './link.component';
import { Router } from '@angular/router';
import { SoundService } from '../../sound/sound.service';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let router: Router;
  let soundService: SoundService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, LinkComponent],
      providers: [SoundService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    soundService = TestBed.inject(SoundService);
    spyOn(router, 'navigateByUrl');
    spyOn(soundService, 'play');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values', () => {
    expect(component.href).toBe('/');
    expect(component.label).toBe('Click me');
  });

  it('should navigate to the specified URL on link click', () => {
    component.href = '/test';
    component.handleLink();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/test');
  });

  it('should play a sound on link click', () => {
    component.handleLink();
    expect(soundService.play).toHaveBeenCalled();
  });
});
