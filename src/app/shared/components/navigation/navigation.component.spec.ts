import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env/environment';
import { NavigationLink } from '@shared/interfaces/navigation-link';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { NavigationComponent } from './navigation.component';

@Component({
  template: '',
  standalone: true,
})
class DummyRouteComponent { }

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  const navigationLinks: NavigationLink[] = environment.navigation;

  beforeEach(async () => {
    const routes = [{ path: '', component: DummyRouteComponent }];
    navigationLinks.forEach(link => {
      const routePath = link.path.replace(/^\//, '');
      if (routePath) {
        routes.push({ path: routePath, component: DummyRouteComponent });
      }
    });

    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        RouterTestingModule.withRoutes(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with menu closed', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  it('toggleMenu opens the menu', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
  });

  it('toggleMenu closes the menu when already open', () => {
    component.isMenuOpen = true;
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('closeMenu sets isMenuOpen to false', () => {
    component.isMenuOpen = true;
    component.closeMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('closeMenu is idempotent when already closed', () => {
    component.closeMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('renders the mobile overlay and dropdown when menu is opened', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    expect(btn).toBeTruthy();
    btn?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mobile-overlay')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.mobile-dropdown')).toBeTruthy();
  });

  it('clicking the mobile overlay closes the menu', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    btn?.click();
    fixture.detectChanges();

    const overlay: HTMLElement | null = fixture.nativeElement.querySelector('.mobile-overlay');
    expect(overlay).toBeTruthy();
    overlay?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.isMenuOpen).toBe(false);
    expect(fixture.nativeElement.querySelector('.mobile-overlay')).toBeFalsy();
  });

  it('pressing Escape on the mobile overlay closes the menu', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    btn?.click();
    fixture.detectChanges();

    const overlay: HTMLElement | null = fixture.nativeElement.querySelector('.mobile-overlay');
    expect(overlay).toBeTruthy();
    overlay?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape' }));
    fixture.detectChanges();

    expect(component.isMenuOpen).toBe(false);
  });

  it('clicking the brand link closes the menu', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    btn?.click();
    fixture.detectChanges();

    const brand: HTMLAnchorElement | null = fixture.nativeElement.querySelector('.nav-brand');
    expect(brand).toBeTruthy();
    brand?.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isMenuOpen).toBe(false);
  });

  it('clicking a mobile dropdown link closes the menu', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    btn?.click();
    fixture.detectChanges();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('.mobile-dropdown-link');
    expect(link).toBeTruthy();
    link?.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isMenuOpen).toBe(false);
  });

  it('clicking a bottom mobile nav item closes the menu', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    btn?.click();
    fixture.detectChanges();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('.mobile-nav-item');
    expect(link).toBeTruthy();
    link?.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isMenuOpen).toBe(false);
  });

  it('toggles aria-expanded and hamburger classes when opening the menu', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    expect(btn?.getAttribute('aria-expanded')).toBe('false');

    btn?.click();
    fixture.detectChanges();

    expect(btn?.getAttribute('aria-expanded')).toBe('true');
    const lines: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.hamburger-line');
    expect(lines.length).toBe(3);
    expect(Array.from(lines).every(l => l.classList.contains('open'))).toBe(true);
  });

  it('renders and allows clicking desktop navigation links', () => {
    const desktopLinks: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('.nav-links .nav-link');
    expect(desktopLinks.length).toBe(navigationLinks.length);
    desktopLinks.forEach(link => {
      link.click();
    });
  });

  it('renders and allows clicking remaining mobile navigation links', () => {
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.mobile-menu-btn');
    btn?.click();
    fixture.detectChanges();

    const mobileLinks: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('.mobile-dropdown-link');
    expect(mobileLinks.length).toBe(navigationLinks.length + 1);
    mobileLinks.forEach(link => {
      link.click();
      fixture.detectChanges();
    });

    const bottomNavItems: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('.mobile-nav-item');
    expect(bottomNavItems.length).toBe(navigationLinks.length + 1);
    bottomNavItems.forEach(item => {
      item.click();
      fixture.detectChanges();
    });
  });
});
