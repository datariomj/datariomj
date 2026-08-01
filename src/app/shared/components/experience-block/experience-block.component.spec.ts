import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ExperienceBlockComponent, ExperienceMetric } from './experience-block.component';

const MOCK_METRICS: ExperienceMetric[] = [
  { label: 'Uptime', value: '99.99%' },
  { label: 'Deployments', value: '5000+' },
];

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

    it('metrics defaults to empty array', () => {
      expect(component.metrics).toEqual([]);
    });

    it('showMetrics defaults to false', () => {
      expect(component.showMetrics).toBe(false);
    });
  });

  describe('toggleMetrics', () => {
    it('toggles showMetrics from false to true', () => {
      component.toggleMetrics();
      expect(component.showMetrics).toBe(true);
    });

    it('toggles showMetrics back to false', () => {
      component.showMetrics = true;
      component.toggleMetrics();
      expect(component.showMetrics).toBe(false);
    });

    it('can be toggled multiple times', () => {
      component.toggleMetrics();
      component.toggleMetrics();
      component.toggleMetrics();
      expect(component.showMetrics).toBe(true);
    });
  });

  describe('@Input bindings', () => {
    it('accepts a title', () => {
      component.title = 'DevOps Engineer Lead';
      expect(component.title).toBe('DevOps Engineer Lead');
    });

    it('accepts metrics', () => {
      component.metrics = MOCK_METRICS;
      expect(component.metrics.length).toBe(2);
      expect(component.metrics[0].label).toBe('Uptime');
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
});
