import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render projects', () => {
    expect(component).toBeTruthy();
    expect(component.projects().length).toBeGreaterThan(0);
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Engineering Projects');
    expect(el.textContent).toContain('datariomj.dev');
  });
});
