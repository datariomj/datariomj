import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';

import { TerminalHeroComponent } from '../shared/components/terminal-hero/terminal-hero.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectItem } from './interfaces/project-item';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TerminalHeroComponent, ProjectCardComponent],
})
export class Projects {
  readonly projects = signal<ProjectItem[]>([
    {
      id: 'datariomj',
      title: 'datariomj.dev',
      description: 'Personal portfolio & engineering playground built on Angular 22 with zoneless change detection and Tailwind CSS.',
      category: 'Web Application',
      status: 'ACTIVE',
      techStack: ['Angular 22', 'TypeScript', 'Tailwind CSS', 'NGXS', 'Vitest'],
      repoUrl: 'https://github.com/datariomj/datariomj',
      liveUrl: 'https://datariomj.dev',
      featured: true,
    },
    {
      id: 'datariomj-infra',
      title: 'datariomj-infra',
      description: 'AWS CDK monorepo provisioning S3, CloudFront, Route53, and ACM certificates for static edge distribution.',
      category: 'Cloud Infrastructure',
      status: 'ACTIVE',
      techStack: ['AWS CDK', 'TypeScript', 'CloudFront', 'S3', 'Route53'],
      repoUrl: 'https://github.com/datariomj/infra',
      featured: true,
    },
    {
      id: 'datariomj-azp-agent',
      title: 'datariomj-azp-agent',
      description: 'Docker container image and startup scripts for self-hosted Azure DevOps agent runners on Apple Silicon.',
      category: 'DevOps / Containers',
      status: 'ACTIVE',
      techStack: ['Docker', 'Bash', 'Azure DevOps Agent', 'Node.js', 'AWS CLI'],
      repoUrl: 'https://github.com/datariomj/datariomj-azp-agent',
      featured: true,
    },
  ]);
}
