import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ProjectItem } from '../../interfaces/project-item';
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  const mockProject: ProjectItem = {
    id: 'test-proj',
    title: 'Test Project',
    description: 'A mock project for testing',
    category: 'Fullstack',
    status: 'ACTIVE',
    techStack: ['Angular', 'TypeScript'],
    repoUrl: 'https://github.com/datariomj/test',
    liveUrl: 'https://test.datariomj.dev',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('should create and render project title and status', () => {
    expect(component).toBeTruthy();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Test Project');
    expect(el.textContent).toContain('ACTIVE');
    expect(el.textContent).toContain('A mock project for testing');
  });

  it('renders technology tags', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Angular');
    expect(el.textContent).toContain('TypeScript');
  });
});
