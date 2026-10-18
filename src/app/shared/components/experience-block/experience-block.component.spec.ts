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

  describe('input defaults', () => {
    it('title defaults to empty string', () => {
      expect(component.title()).toBe('');
    });

    it('company defaults to empty string', () => {
      expect(component.company()).toBe('');
    });

    it('dateRange defaults to empty string', () => {
      expect(component.dateRange()).toBe('');
    });

    it('location defaults to empty string', () => {
      expect(component.location()).toBe('');
    });

    it('badge defaults to empty string', () => {
      expect(component.badge()).toBe('');
    });

    it('isCurrent defaults to false', () => {
      expect(component.isCurrent()).toBe(false);
    });

    it('items defaults to empty array', () => {
      expect(component.items()).toEqual([]);
    });

    it('technologies defaults to empty array', () => {
      expect(component.technologies()).toEqual([]);
    });
  });

  describe('input bindings', () => {
    it('accepts a title', () => {
      fixture.componentRef.setInput('title', 'DevOps Engineer Lead');
      expect(component.title()).toBe('DevOps Engineer Lead');
    });

    it('accepts items list', () => {
      fixture.componentRef.setInput('items', ['Led CI/CD migration', 'Reduced deployment time']);
      expect(component.items()).toHaveLength(2);
    });

    it('accepts technologies list', () => {
      fixture.componentRef.setInput('technologies', ['Terraform', 'AWS', 'Kubernetes']);
      expect(component.technologies()).toContain('Kubernetes');
    });

    it('accepts isCurrent flag', () => {
      fixture.componentRef.setInput('isCurrent', true);
      expect(component.isCurrent()).toBe(true);
    });
  });

  describe('template rendering', () => {
    it('renders badge and location when provided', () => {
      const f = TestBed.createComponent(ExperienceBlockComponent);
      f.componentRef.setInput('title', 'Title');
      f.componentRef.setInput('company', 'Company');
      f.componentRef.setInput('badge', 'LEAD');
      f.componentRef.setInput('location', 'PH');
      f.componentRef.setInput('items', ['A']);
      f.detectChanges();

      const el: HTMLElement = f.nativeElement;
      expect(el.querySelector('.role-badge')).toBeTruthy();
      expect(el.querySelector('.role-badge')?.textContent ?? '').toContain('LEAD');
      expect(el.querySelector('.location-tag')).toBeTruthy();
      expect(el.querySelector('.location-tag')?.textContent ?? '').toContain('PH');
    });

    it('renders current vs non-current bullets', () => {
      const f = TestBed.createComponent(ExperienceBlockComponent);
      f.componentRef.setInput('items', ['A']);
      f.componentRef.setInput('isCurrent', true);
      f.detectChanges();
      expect(f.nativeElement.querySelector('.bullet')).toBeTruthy();

      const f2 = TestBed.createComponent(ExperienceBlockComponent);
      f2.componentRef.setInput('items', ['A']);
      f2.componentRef.setInput('isCurrent', false);
      f2.detectChanges();
      expect(f2.nativeElement.querySelector('.bullet-inactive')).toBeTruthy();
    });

    it('renders technologies list when provided', () => {
      const f = TestBed.createComponent(ExperienceBlockComponent);
      f.componentRef.setInput('items', ['A']);
      f.componentRef.setInput('technologies', ['Terraform', 'AWS']);
      f.detectChanges();
      expect(f.nativeElement.querySelectorAll('.tech-tag').length).toBe(2);
    });
  });
});
