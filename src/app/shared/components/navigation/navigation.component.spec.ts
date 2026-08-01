import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
