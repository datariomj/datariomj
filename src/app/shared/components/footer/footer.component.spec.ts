import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('currentYear is at least 2021', () => {
    expect(component.currentYear).toBeGreaterThanOrEqual(2021);
  });

  it('currentYear is the current year or later', () => {
    const now = new Date().getFullYear();
    expect(component.currentYear).toBe(Math.max(now, 2021));
  });

  it('currentYear is not in the past relative to 2021 floor', () => {
    expect(component.currentYear).not.toBeLessThan(2021);
  });
});
