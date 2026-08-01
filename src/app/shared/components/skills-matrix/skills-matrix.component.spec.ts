import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { SkillCategory,SkillsMatrixComponent } from './skills-matrix.component';

const MOCK_CATEGORIES: SkillCategory[] = [
  { category: 'Infrastructure', items: ['Terraform', 'AWS', 'Kubernetes'] },
  { category: 'Languages', items: ['TypeScript', 'Python'] },
];

describe('SkillsMatrixComponent', () => {
  let component: SkillsMatrixComponent;
  let fixture: ComponentFixture<SkillsMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsMatrixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with an empty categories array by default', () => {
    expect(component.categories).toEqual([]);
  });

  it('accepts a categories input', () => {
    component.categories = MOCK_CATEGORIES;
    expect(component.categories.length).toBe(2);
  });

  it('reflects provided categories', () => {
    component.categories = MOCK_CATEGORIES;
    expect(component.categories[0].category).toBe('Infrastructure');
    expect(component.categories[0].items).toContain('Terraform');
  });

  it('handles empty items array within a category', () => {
    component.categories = [{ category: 'Empty', items: [] }];
    expect(component.categories[0].items).toEqual([]);
  });

  it('preserves order of categories', () => {
    component.categories = MOCK_CATEGORIES;
    expect(component.categories[0].category).toBe('Infrastructure');
    expect(component.categories[1].category).toBe('Languages');
  });
});
