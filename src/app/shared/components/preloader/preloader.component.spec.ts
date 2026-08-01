import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PreloaderComponent } from './preloader.component';

describe('PreloaderComponent', () => {
  let component: PreloaderComponent;
  let fixture: ComponentFixture<PreloaderComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [PreloaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreloaderComponent);
    component = fixture.componentInstance;

    // Reset timers and state that may have been started on component creation
    vi.clearAllTimers();
    if (component['timer']) {
      clearInterval(component['timer']);
      component['timer'] = null;
    }
    component.progress = 0;
    component.displayedLogs = [];
  });

  afterEach(() => {
    component.ngOnDestroy();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with progress at 0', () => {
    expect(component.progress).toBe(0);
  });

  it('starts with no displayed logs', () => {
    expect(component.displayedLogs).toEqual([]);
  });

  describe('runBootSequence', () => {
    it('adds one log item after first interval tick (100ms)', () => {
      vi.clearAllTimers();
      component.displayedLogs = [];
      component.runBootSequence();
      vi.advanceTimersByTime(100);
      expect(component.displayedLogs.length).toBe(1);
    });

    it('progress advances after the first tick', () => {
      component.runBootSequence();
      vi.advanceTimersByTime(100);
      expect(component.progress).toBeGreaterThan(0);
    });

    it('reaches 100% progress after all logs are displayed', () => {
      component.runBootSequence();
      vi.advanceTimersByTime(700);
      expect(component.progress).toBe(100);
    });

    it('displays all 5 boot log entries', () => {
      component.runBootSequence();
      vi.advanceTimersByTime(700);
      expect(component.displayedLogs.length).toBe(5);
    });

    it('first log message initializes the kernel', () => {
      component.runBootSequence();
      vi.advanceTimersByTime(100);
      expect(component.displayedLogs[0].message).toContain('INITIALIZING');
    });

    it('last log message has READY status', () => {
      component.runBootSequence();
      vi.advanceTimersByTime(700);
      const last = component.displayedLogs[component.displayedLogs.length - 1];
      expect(last.status).toBe('READY');
    });

    it('progress increments proportionally per log (3/5 = 60%)', () => {
      component.runBootSequence();
      vi.advanceTimersByTime(300); // 3 of 5 logs
      expect(component.progress).toBe(60);
    });
  });

  describe('ngOnInit', () => {
    it('triggers runBootSequence on init (detectChanges)', () => {
      fixture.detectChanges(); // triggers ngOnInit which calls runBootSequence
      vi.advanceTimersByTime(700);
      expect(component.displayedLogs.length).toBe(5);
    });
  });

  describe('ngOnDestroy', () => {
    it('clears the interval on destroy without error', () => {
      fixture.detectChanges();
      vi.advanceTimersByTime(100);
      expect(() => fixture.destroy()).not.toThrow();
    });
  });
});
