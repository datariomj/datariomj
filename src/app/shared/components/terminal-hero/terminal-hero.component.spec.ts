import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TerminalHeroComponent } from './terminal-hero.component';

function makeInput(value: string, selectionStart?: number): HTMLInputElement {
  const el = document.createElement('input');
  el.value = value;
  el.selectionStart = selectionStart ?? value.length;
  return el;
}

describe('TerminalHeroComponent', () => {
  let component: TerminalHeroComponent;
  let fixture: ComponentFixture<TerminalHeroComponent>;
  let mockRouter: { url: string; navigate: ReturnType<typeof vi.fn>; events: unknown };

  beforeEach(async () => {
    vi.useFakeTimers();

    mockRouter = {
      url: '/',
      navigate: vi.fn(),
      events: { pipe: vi.fn(() => ({ subscribe: vi.fn() })) },
    };

    await TestBed.configureTestingModule({
      imports: [TerminalHeroComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalHeroComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ─── Creation ──────────────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── ngOnInit – route-based defaults ───────────────────────────────────────

  describe('ngOnInit – home route (/)', () => {
    it('sets currentPath to empty string', () => {
      mockRouter.url = '/';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.currentPath).toBe('');
    });

    it('sets activeCommand to "cd /"', () => {
      mockRouter.url = '/';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeCommand).toBe('cd /');
    });

    it('includes whoami output', () => {
      mockRouter.url = '/';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeOutput.some(o => o.text.includes('whoami'))).toBe(true);
    });
  });

  describe('ngOnInit – /experience route', () => {
    it('sets currentPath to "experience"', () => {
      mockRouter.url = '/experience';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.currentPath).toBe('experience');
    });

    it('sets activeCommand to "cd /experience"', () => {
      mockRouter.url = '/experience';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeCommand).toBe('cd /experience');
    });
  });

  describe('ngOnInit – /stack route', () => {
    it('sets currentPath to "stack"', () => {
      mockRouter.url = '/stack';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.currentPath).toBe('stack');
    });
  });

  describe('ngOnInit – /contact route', () => {
    it('sets currentPath to "contact"', () => {
      mockRouter.url = '/contact';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.currentPath).toBe('contact');
    });
  });

  describe('ngOnInit – /about route', () => {
    it('sets currentPath to "about"', () => {
      mockRouter.url = '/about';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.currentPath).toBe('about');
    });
  });

  describe('ngOnInit – error mode', () => {
    it('uses errorSlug in activeCommand when isError=true', () => {
      component.isError = true;
      component.errorSlug = '404';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeCommand).toBe('curl -I /404');
    });

    it('uses 404 output items when isError=true', () => {
      component.isError = true;
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeOutput.some(o => o.text.includes('404'))).toBe(true);
    });

    it('respects custom initialCommand when isError=true', () => {
      component.isError = true;
      component.initialCommand = 'my-custom-cmd';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeCommand).toBe('my-custom-cmd');
    });
  });

  describe('ngOnInit – custom inputs override defaults', () => {
    it('uses provided initialPath', () => {
      mockRouter.url = '/';
      component.initialPath = 'custom-path';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.currentPath).toBe('custom-path');
    });

    it('uses provided initialCommand', () => {
      mockRouter.url = '/';
      component.initialCommand = 'ls -la';
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeCommand).toBe('ls -la');
    });

    it('uses provided initialOutput', () => {
      mockRouter.url = '/';
      component.initialOutput = [{ type: 'output-success', text: 'CUSTOM OUTPUT' }];
      fixture.detectChanges();
      vi.advanceTimersByTime(2000);
      expect(component.activeOutput[0].text).toBe('CUSTOM OUTPUT');
    });
  });

  // ─── runInitialSequence ─────────────────────────────────────────────────────

  describe('runInitialSequence', () => {
    it('sets isTyping to true immediately', () => {
      component.activeCommand = 'cd /';
      component.activeOutput = [{ type: 'output-success', text: 'OK' }];
      component.runInitialSequence();
      expect(component.isTyping).toBe(true);
      vi.advanceTimersByTime(2000);
    });

    it('isTyping becomes false after typing completes', () => {
      component.activeCommand = 'x';
      component.activeOutput = [];
      component.runInitialSequence();
      vi.advanceTimersByTime(2000);
      expect(component.isTyping).toBe(false);
    });

    it('clears stale history before typing', () => {
      component.history = [{ type: 'output', text: 'stale' }];
      component.activeCommand = 'cd /';
      component.activeOutput = [];
      component.runInitialSequence();
      vi.advanceTimersByTime(2000);
      expect(component.history.every(h => h.text !== 'stale')).toBe(true);
    });

    it('builds history character by character at 80ms intervals', () => {
      // Flush any pending timers from beforeEach component creation
      vi.runAllTimers();
      component.activeCommand = 'hi';
      component.activeOutput = [];
      component.runInitialSequence();
      vi.advanceTimersByTime(80);
      expect(component.history[0].text).toBe('h');
      vi.advanceTimersByTime(80);
      expect(component.history[0].text).toBe('hi');
      vi.advanceTimersByTime(2000);
    });

    it('appends help hint as last item after page output', () => {
      component.activeCommand = 'x';
      component.activeOutput = [{ type: 'output-success', text: 'A' }];
      component.runInitialSequence();
      vi.advanceTimersByTime(2000);
      const last = component.history[component.history.length - 1];
      expect(last.text).toContain('help');
    });
  });

  // ─── reconnect ─────────────────────────────────────────────────────────────

  describe('reconnect', () => {
    it('resets isClosed to false', () => {
      component.isClosed = true;
      component.activeCommand = 'x';
      component.activeOutput = [];
      component.reconnect();
      expect(component.isClosed).toBe(false);
      vi.advanceTimersByTime(2000);
    });
  });

  // ─── closeTerminal ─────────────────────────────────────────────────────────

  describe('closeTerminal', () => {
    it('sets isClosed to true', () => {
      const event = new Event('click');
      component.closeTerminal(event);
      expect(component.isClosed).toBe(true);
    });

    it('calls stopPropagation on the event', () => {
      const event = new Event('click');
      const spy = vi.spyOn(event, 'stopPropagation');
      component.closeTerminal(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  // ─── Focus / Blur ───────────────────────────────────────────────────────────

  describe('onFocus / onBlur', () => {
    it('sets isFocused true on focus', () => {
      component.onFocus();
      expect(component.isFocused).toBe(true);
    });

    it('sets isFocused false on blur', () => {
      component.isFocused = true;
      component.onBlur();
      expect(component.isFocused).toBe(false);
    });
  });

  // ─── getCurrentRouteName ────────────────────────────────────────────────────

  describe('getCurrentRouteName', () => {
    it('returns "home" for /', () => {
      mockRouter.url = '/';
      expect(component.getCurrentRouteName()).toBe('home');
    });

    it('returns "about" for /about', () => {
      mockRouter.url = '/about';
      expect(component.getCurrentRouteName()).toBe('about');
    });

    it('returns "experience" for /experience', () => {
      mockRouter.url = '/experience';
      expect(component.getCurrentRouteName()).toBe('experience');
    });

    it('returns "stack" for /stack', () => {
      mockRouter.url = '/stack';
      expect(component.getCurrentRouteName()).toBe('stack');
    });

    it('returns "contact" for /contact', () => {
      mockRouter.url = '/contact';
      expect(component.getCurrentRouteName()).toBe('contact');
    });
  });

  // ─── onInputChange – autocomplete / ghost text ──────────────────────────────

  describe('onInputChange', () => {
    beforeEach(() => {
      mockRouter.url = '/';
    });

    it('clears suggestions for single-word input (no space)', () => {
      component.onInputChange('help');
      expect(component.suggestions).toEqual([]);
      expect(component.ghostText).toBe('');
    });

    it('populates suggestions for "cd a" on home route', () => {
      component.onInputChange('cd a');
      expect(component.suggestions.length).toBeGreaterThan(0);
      expect(component.suggestions.every(s => s.startsWith('a'))).toBe(true);
    });

    it('sets ghostText for first suggestion on "cd ab"', () => {
      component.onInputChange('cd ab');
      expect(component.ghostText.length).toBeGreaterThan(0);
    });

    it('populates suggestions for "cat e" on home route', () => {
      component.onInputChange('cat e');
      expect(component.suggestions.some(s => s.startsWith('e'))).toBe(true);
    });

    it('clears ghostText when no match found', () => {
      component.onInputChange('cd zzz');
      expect(component.ghostText).toBe('');
      expect(component.suggestions).toEqual([]);
    });

    it('filters out current route from cd suggestions', () => {
      mockRouter.url = '/about';
      component.onInputChange('cd a');
      expect(component.suggestions.every(s => !s.startsWith('about'))).toBe(true);
    });

    it('tracks inputValue correctly', () => {
      component.onInputChange('cd s');
      expect(component.inputValue).toBe('cd s');
    });
  });

  // ─── onTab ─────────────────────────────────────────────────────────────────

  describe('onTab', () => {
    it('completes the input value when suggestion exists', () => {
      component.suggestions = ['about'];
      const input = makeInput('cd a');
      const event = new Event('keydown');
      component.onTab(event, input);
      expect(input.value).toBe('cd about');
    });

    it('clears suggestions and ghostText after completion', () => {
      component.suggestions = ['about'];
      component.ghostText = 'bout';
      const input = makeInput('cd a');
      component.onTab(new Event('keydown'), input);
      expect(component.suggestions).toEqual([]);
      expect(component.ghostText).toBe('');
    });

    it('calls preventDefault', () => {
      component.suggestions = ['about'];
      const event = new Event('keydown');
      const spy = vi.spyOn(event, 'preventDefault');
      component.onTab(event, makeInput('cd a'));
      expect(spy).toHaveBeenCalled();
    });

    it('does nothing when no suggestions', () => {
      component.suggestions = [];
      const input = makeInput('cd a');
      component.onTab(new Event('keydown'), input);
      expect(input.value).toBe('cd a');
    });
  });

  // ─── onArrowRight ───────────────────────────────────────────────────────────

  describe('onArrowRight', () => {
    it('completes input when cursor is at end and suggestion exists', () => {
      component.suggestions = ['stack'];
      const input = makeInput('cd s');
      component.onArrowRight(new Event('keydown'), input);
      expect(input.value).toBe('cd stack');
    });

    it('does nothing when cursor is not at end', () => {
      component.suggestions = ['stack'];
      const input = makeInput('cd s', 2);
      component.onArrowRight(new Event('keydown'), input);
      expect(input.value).toBe('cd s');
    });

    it('does nothing when no suggestions', () => {
      component.suggestions = [];
      const input = makeInput('cd s');
      component.onArrowRight(new Event('keydown'), input);
      expect(input.value).toBe('cd s');
    });
  });

  // ─── applySuggestion ───────────────────────────────────────────────────────

  describe('applySuggestion', () => {
    it('fills the input with the full suggested value', () => {
      const input = makeInput('cd c');
      component.applySuggestion('contact', input);
      expect(input.value).toBe('cd contact');
    });

    it('clears suggestions and ghostText after applying', () => {
      component.suggestions = ['contact'];
      component.ghostText = 'ontact';
      component.applySuggestion('contact', makeInput('cd c'));
      expect(component.suggestions).toEqual([]);
      expect(component.ghostText).toBe('');
    });
  });

  // ─── execute – empty / whitespace ──────────────────────────────────────────

  describe('execute – empty input', () => {
    it('does not push to history when input is blank', () => {
      component.history = [];
      component.execute(makeInput('   '));
      expect(component.history.length).toBe(0);
    });

    it('resets inputValue to empty string', () => {
      component.inputValue = 'something';
      component.execute(makeInput(''));
      expect(component.inputValue).toBe('');
    });
  });

  // ─── execute – clear ───────────────────────────────────────────────────────

  describe('execute "clear"', () => {
    it('empties the history array', () => {
      component.history = [{ type: 'output', text: 'a' }, { type: 'output', text: 'b' }];
      component.execute(makeInput('clear'));
      expect(component.history).toEqual([]);
    });
  });

  // ─── execute – help ────────────────────────────────────────────────────────

  describe('execute "help"', () => {
    it('pushes command entry then help output', () => {
      component.history = [];
      component.execute(makeInput('help'));
      expect(component.history[0]).toMatchObject({ type: 'command', text: 'help' });
      expect(component.history[1].text).toContain('Available commands');
    });

    it('output lists ls, cat, cd, pwd entries', () => {
      component.history = [];
      component.execute(makeInput('help'));
      const out = component.history[1];
      expect(out.text).toContain('ls');
      expect(out.text).toContain('cat');
      expect(out.text).toContain('cd');
      expect(out.text).toContain('pwd');
    });

    it('includes an html field', () => {
      component.history = [];
      component.execute(makeInput('help'));
      expect(component.history[1].html).toBeTruthy();
    });
  });

  // ─── execute – ls ──────────────────────────────────────────────────────────

  describe('execute "ls"', () => {
    it('lists the four page markdown files', () => {
      component.history = [];
      component.execute(makeInput('ls'));
      const out = component.history[1];
      expect(out.text).toContain('about.md');
      expect(out.text).toContain('experience.md');
      expect(out.text).toContain('stack.md');
      expect(out.text).toContain('contact.md');
    });

    it('includes html field', () => {
      component.history = [];
      component.execute(makeInput('ls'));
      expect(component.history[1].html).toBeTruthy();
    });
  });

  // ─── execute – cat ─────────────────────────────────────────────────────────

  describe('execute "cat"', () => {
    it('no arg shows usage error', () => {
      component.history = [];
      component.execute(makeInput('cat'));
      expect(component.history[1]).toMatchObject({ type: 'output-error', text: 'Usage: cat <filename>' });
    });

    it('cat about.md shows about content', () => {
      component.history = [];
      component.execute(makeInput('cat about.md'));
      expect(component.history[1].text).toContain('Marc Joseph Datario');
    });

    it('cat about (no .md extension) also shows about content', () => {
      component.history = [];
      component.execute(makeInput('cat about'));
      expect(component.history[1].text).toContain('Marc Joseph Datario');
    });

    it('cat experience.md shows experience summary', () => {
      component.history = [];
      component.execute(makeInput('cat experience.md'));
      expect(component.history[1].text).toContain('Experience Summary');
    });

    it('cat cv is alias for experience', () => {
      component.history = [];
      component.execute(makeInput('cat cv'));
      expect(component.history[1].text).toContain('Experience Summary');
    });

    it('cat stack.md shows technology stack', () => {
      component.history = [];
      component.execute(makeInput('cat stack.md'));
      expect(component.history[1].text).toContain('Technology Stack');
    });

    it('cat contact.md shows contact info', () => {
      component.history = [];
      component.execute(makeInput('cat contact.md'));
      expect(component.history[1].text).toContain('mail@datariomj.dev');
    });

    it('cat unknown file shows "No such file or directory" error', () => {
      component.history = [];
      component.execute(makeInput('cat unicorn'));
      expect(component.history[1]).toMatchObject({ type: 'output-error' });
      expect(component.history[1].text).toContain('No such file or directory');
    });

    it('cat with leading slash strips it and resolves correctly', () => {
      component.history = [];
      component.execute(makeInput('cat /about.md'));
      expect(component.history[1].text).toContain('Marc Joseph Datario');
    });
  });

  // ─── execute – cd ──────────────────────────────────────────────────────────

  describe('execute "cd"', () => {
    it('cd with no arg navigates to /', () => {
      component.execute(makeInput('cd'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('cd ~ navigates to /', () => {
      component.execute(makeInput('cd ~'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('cd / navigates to /', () => {
      component.execute(makeInput('cd /'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('cd about navigates to /', () => {
      component.execute(makeInput('cd about'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('cd home navigates to /', () => {
      component.execute(makeInput('cd home'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('cd experience navigates to /experience', () => {
      component.execute(makeInput('cd experience'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/experience']);
    });

    it('cd cv is alias for /experience', () => {
      component.execute(makeInput('cd cv'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/experience']);
    });

    it('cd experience.md navigates to /experience', () => {
      component.execute(makeInput('cd experience.md'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/experience']);
    });

    it('cd stack navigates to /stack', () => {
      component.execute(makeInput('cd stack'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/stack']);
    });

    it('cd contact navigates to /contact', () => {
      component.execute(makeInput('cd contact'));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/contact']);
    });

    it('cd unknown dir shows "no such directory" error', () => {
      component.history = [];
      component.execute(makeInput('cd totally-fake'));
      const last = component.history[component.history.length - 1];
      expect(last.type).toBe('output-error');
      expect(last.text).toContain('no such directory');
    });
  });

  // ─── execute – unknown command ──────────────────────────────────────────────

  describe('execute – unknown command', () => {
    it('shows "command not found" error with the command name', () => {
      component.history = [];
      component.execute(makeInput('foobar'));
      const last = component.history[component.history.length - 1];
      expect(last.type).toBe('output-error');
      expect(last.text).toContain('command not found');
      expect(last.text).toContain('foobar');
    });
  });

  // ─── execute – shared side effects ─────────────────────────────────────────

  describe('execute – shared side effects', () => {
    it('always records the command in history as first entry', () => {
      component.history = [];
      component.execute(makeInput('ls'));
      expect(component.history[0]).toMatchObject({ type: 'command', text: 'ls' });
    });

    it('clears the input element value after execution', () => {
      const input = makeInput('ls');
      component.execute(input);
      expect(input.value).toBe('');
    });

    it('clears suggestions after execution', () => {
      component.suggestions = ['about'];
      component.execute(makeInput('ls'));
      expect(component.suggestions).toEqual([]);
    });

    it('clears ghostText after execution', () => {
      component.ghostText = 'bout';
      component.execute(makeInput('ls'));
      expect(component.ghostText).toBe('');
    });
  });

  // ─── handleCat (direct unit tests) ────────────────────────────────────────

  describe('handleCat (direct)', () => {
    it('empty arg pushes usage error', () => {
      component.history = [];
      component.handleCat('');
      expect(component.history[0]).toMatchObject({ type: 'output-error' });
    });

    it('handles uppercase ABOUT gracefully', () => {
      component.history = [];
      component.handleCat('ABOUT');
      expect(component.history[0].text).toContain('Marc Joseph Datario');
    });

    it('handles uppercase STACK', () => {
      component.history = [];
      component.handleCat('STACK');
      expect(component.history[0].text).toContain('Technology Stack');
    });
  });

  // ─── handleCd (direct unit tests) ─────────────────────────────────────────

  describe('handleCd (direct)', () => {
    it('handles uppercase CONTACT', () => {
      component.handleCd('CONTACT');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/contact']);
    });

    it('strips leading slash from /experience', () => {
      component.handleCd('/experience');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/experience']);
    });

    it('strips .md from /stack.md', () => {
      component.handleCd('/stack.md');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/stack']);
    });
  });

  // ─── printPageStatus ────────────────────────────────────────────────────────

  describe('printPageStatus', () => {
    it('appends activeOutput items to history', () => {
      component.history = [{ type: 'command', text: 'cd /' }];
      component.activeOutput = [{ type: 'output-success', text: 'PAGE LOADED' }];
      component.printPageStatus();
      expect(component.history.some(h => h.text === 'PAGE LOADED')).toBe(true);
    });

    it('appends a help hint as the last item', () => {
      component.history = [];
      component.activeOutput = [];
      component.printPageStatus();
      const last = component.history[component.history.length - 1];
      expect(last.text).toContain('help');
    });
  });
});
