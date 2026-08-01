import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { beforeEach, describe, expect, it } from 'vitest';

import { ContactFormVisibility, PreloaderVisibility, ToggleSidenav } from './ui.action';
import { UIState } from './ui.state';

describe('UIState', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore([UIState])],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  describe('defaults', () => {
    it('sidenavExpanded starts as false', () => {
      const val = store.selectSnapshot(UIState.sidenavExpanded);
      expect(val).toBe(false);
    });

    it('showPreloader starts as false', () => {
      const val = store.selectSnapshot(UIState.showPreloader);
      expect(val).toBe(false);
    });

    it('showContactForm starts as false', () => {
      const val = store.selectSnapshot(UIState.showContactForm);
      expect(val).toBe(false);
    });
  });

  describe('ToggleSidenav', () => {
    it('toggles sidenavExpanded from false to true', () => {
      store.dispatch(new ToggleSidenav());
      expect(store.selectSnapshot(UIState.sidenavExpanded)).toBe(true);
    });

    it('toggles sidenavExpanded back to false', () => {
      store.dispatch(new ToggleSidenav());
      store.dispatch(new ToggleSidenav());
      expect(store.selectSnapshot(UIState.sidenavExpanded)).toBe(false);
    });

    it('can toggle multiple times', () => {
      store.dispatch(new ToggleSidenav());
      store.dispatch(new ToggleSidenav());
      store.dispatch(new ToggleSidenav());
      expect(store.selectSnapshot(UIState.sidenavExpanded)).toBe(true);
    });
  });

  describe('PreloaderVisibility', () => {
    it('sets showPreloader to true', () => {
      store.dispatch(new PreloaderVisibility(true));
      expect(store.selectSnapshot(UIState.showPreloader)).toBe(true);
    });

    it('sets showPreloader to false', () => {
      store.dispatch(new PreloaderVisibility(true));
      store.dispatch(new PreloaderVisibility(false));
      expect(store.selectSnapshot(UIState.showPreloader)).toBe(false);
    });
  });

  describe('ContactFormVisibility', () => {
    it('sets showContactForm to true', () => {
      store.dispatch(new ContactFormVisibility(true));
      expect(store.selectSnapshot(UIState.showContactForm)).toBe(true);
    });

    it('sets showContactForm to false', () => {
      store.dispatch(new ContactFormVisibility(true));
      store.dispatch(new ContactFormVisibility(false));
      expect(store.selectSnapshot(UIState.showContactForm)).toBe(false);
    });
  });

  describe('selectors', () => {
    it('sidenavExpanded selector reflects state', () => {
      store.dispatch(new ToggleSidenav());
      expect(store.selectSnapshot(UIState.sidenavExpanded)).toBe(true);
    });

    it('showPreloader selector reflects state', () => {
      store.dispatch(new PreloaderVisibility(true));
      expect(store.selectSnapshot(UIState.showPreloader)).toBe(true);
    });

    it('showContactForm selector reflects state', () => {
      store.dispatch(new ContactFormVisibility(true));
      expect(store.selectSnapshot(UIState.showContactForm)).toBe(true);
    });

    it('independent actions do not interfere with each other', () => {
      store.dispatch(new ToggleSidenav());
      store.dispatch(new PreloaderVisibility(true));
      expect(store.selectSnapshot(UIState.sidenavExpanded)).toBe(true);
      expect(store.selectSnapshot(UIState.showPreloader)).toBe(true);
      expect(store.selectSnapshot(UIState.showContactForm)).toBe(false);
    });
  });
});
