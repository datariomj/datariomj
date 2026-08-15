import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ExperienceBlockComponent } from './experience-block.component';

describe('ExperienceBlockComponent', () => {
  let component: ExperienceBlockComponent;
  let fixture: ComponentFixture<ExperienceBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input defaults', () => {
    it('title defaults to empty string', () => {
      expect(component.title).toBe('');
    });

    it('company defaults to empty string', () => {
      expect(component.company).toBe('');
    });

    it('dateRange defaults to empty string', () => {
      expect(component.dateRange).toBe('');
    });

    it('location defaults to empty string', () => {
      expect(component.location).toBe('');
    });

    it('badge defaults to empty string', () => {
      expect(component.badge).toBe('');
    });

    it('isCurrent defaults to false', () => {
      expect(component.isCurrent).toBe(false);
    });

    it('items defaults to empty array', () => {
      expect(component.items).toEqual([]);
    });

    it('technologies defaults to empty array', () => {
      expect(component.technologies).toEqual([]);
    });
  });

  describe('@Input bindings', () => {
    it('accepts a title', () => {
      component.title = 'DevOps Engineer Lead';
      expect(component.title).toBe('DevOps Engineer Lead');
    });

    it('accepts items list', () => {
      component.items = ['Led CI/CD migration', 'Reduced deployment time'];
      expect(component.items).toHaveLength(2);
    });

    it('accepts technologies list', () => {
      component.technologies = ['Terraform', 'AWS', 'Kubernetes'];
      expect(component.technologies).toContain('Kubernetes');
    });

    it('accepts isCurrent flag', () => {
      component.isCurrent = true;
      expect(component.isCurrent).toBe(true);
    });
  });

  describe('template rendering', () => {
    it('renders badge and location when provided', () => {
      const f = TestBed.createComponent(ExperienceBlockComponent);
      const c = f.componentInstance;
      c.title = 'Title';
      c.company = 'Company';
      c.badge = 'LEAD';
      c.location = 'PH';
      c.items = ['A'];
      f.detectChanges();

      const el: HTMLElement = f.nativeElement;
      expect(el.querySelector('.role-badge')).toBeTruthy();
      expect(el.querySelector('.role-badge')?.textContent ?? '').toContain('LEAD');
      expect(el.querySelector('.location-tag')).toBeTruthy();
      expect(el.querySelector('.location-tag')?.textContent ?? '').toContain('PH');
    });

    it('renders current vs non-current bullets', () => {
      const f = TestBed.createComponent(ExperienceBlockComponent);
      const c = f.componentInstance;
      c.items = ['A'];
      c.isCurrent = true;
      f.detectChanges();
      expect(f.nativeElement.querySelector('.bullet')).toBeTruthy();

      const f2 = TestBed.createComponent(ExperienceBlockComponent);
      const c2 = f2.componentInstance;
      c2.items = ['A'];
      c2.isCurrent = false;
      f2.detectChanges();
      expect(f2.nativeElement.querySelector('.bullet-inactive')).toBeTruthy();
    });

    it('renders technologies list when provided', () => {
      const f = TestBed.createComponent(ExperienceBlockComponent);
      const c = f.componentInstance;
      c.items = ['A'];
      c.technologies = ['Terraform', 'AWS'];
      f.detectChanges();
      expect(f.nativeElement.querySelectorAll('.tech-tag').length).toBe(2);
    });
  });
});
