import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TerminalButtonComponent } from './terminal-button.component';

describe('TerminalButtonComponent', () => {
  let component: TerminalButtonComponent;
  let fixture: ComponentFixture<TerminalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has default label as empty string', () => {
    expect(component.label).toBe('');
  });

  it('has default variant as "primary"', () => {
    expect(component.variant).toBe('primary');
  });

  it('accepts "ghost" as a variant', () => {
    component.variant = 'ghost';
    expect(component.variant).toBe('ghost');
  });

  describe('onClick', () => {
    it('emits buttonClick with the event', () => {
      const emitSpy = vi.spyOn(component.buttonClick, 'emit');
      const event = new Event('click');
      component.onClick(event);
      expect(emitSpy).toHaveBeenCalledWith(event);
    });

    it('emits buttonClick exactly once per call', () => {
      const emitSpy = vi.spyOn(component.buttonClick, 'emit');
      component.onClick(new Event('click'));
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('emits different events independently', () => {
      const emitSpy = vi.spyOn(component.buttonClick, 'emit');
      const e1 = new Event('click');
      const e2 = new Event('click');
      component.onClick(e1);
      component.onClick(e2);
      expect(emitSpy).toHaveBeenNthCalledWith(1, e1);
      expect(emitSpy).toHaveBeenNthCalledWith(2, e2);
    });
  });

  describe('@Input bindings', () => {
    it('accepts a custom label', () => {
      component.label = 'Deploy';
      expect(component.label).toBe('Deploy');
    });
  });

  describe('template interactions', () => {
    it('clicking the button emits buttonClick', () => {
      const emitSpy = vi.spyOn(component.buttonClick, 'emit');
      const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
      expect(btn).toBeTruthy();
      btn?.dispatchEvent(new MouseEvent('click'));
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('renders label and variant class', () => {
      const fix = TestBed.createComponent(TerminalButtonComponent);
      fix.componentInstance.label = 'Run';
      fix.componentInstance.variant = 'ghost';
      fix.detectChanges();

      const btn: HTMLButtonElement | null = fix.nativeElement.querySelector('button');
      expect(btn?.classList.contains('terminal-btn')).toBe(true);
      expect(btn?.classList.contains('ghost')).toBe(true);
      expect(btn?.textContent).toContain('Run');
    });
  });
});
