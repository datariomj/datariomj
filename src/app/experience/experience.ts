import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ExperienceBlockComponent } from '../shared/components/experience-block/experience-block.component';
import { TerminalHeroComponent } from '../shared/components/terminal-hero/terminal-hero.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    ExperienceBlockComponent,
    TerminalHeroComponent,
  ],
})
export class Experience {
  experiences = [
    {
      title: 'DevOps Engineer Lead',
      company: 'EasyEquities PH',
      location: 'Makati City, PH',
      badge: 'DevOps Lead',
      dateRange: 'Apr 2023 - Present',
      isCurrent: true,
      technologies: ['AWS', 'Kubernetes', 'EKS', 'Jenkins', 'Terraform', 'Python', 'GitOps'],
      items: [
        'Lead a DevOps team responsible for CI/CD strategy, cloud infrastructure, and platform reliability across fintech services.',
        'Drive modernization of legacy systems toward containerized, cloud-native architectures on AWS.',
        'Introduce AI-assisted automation and GitOps practices to improve deployment velocity and operational consistency.',
        'Mentor engineers and foster a culture of incident readiness, observability, and continuous improvement.',
      ],
    },
    {
      title: 'Senior Software Engineer (SRE)',
      company: 'Avaloq',
      location: 'Makati City, PH',
      badge: 'Senior SRE',
      dateRange: 'Oct 2021 - Apr 2023',
      isCurrent: false,
      technologies: ['Kubernetes', 'Helm', 'Terraform', 'Cloud Custodian', 'Checkov'],
      items: [
        'Managed multi-region Kubernetes platforms and Helm-based deployments through infrastructure-as-code principles.',
        'Implemented monitoring, alerting, and policy-as-code guardrails to strengthen security and compliance posture.',
      ],
    },
    {
      title: 'Solutions Developer',
      company: 'PCCW Solutions',
      location: 'Pasig City, PH',
      badge: 'Solutions Dev',
      dateRange: 'Apr 2020 - Oct 2021',
      isCurrent: false,
      technologies: ['Angular', 'TypeScript', 'Cypress', 'Node.js', 'REST APIs'],
      items: [
        'Built enterprise-grade web applications with Angular and TypeScript for CRM and business-process workflows.',
        'Established end-to-end test automation practices with Cypress to improve release confidence and QA coverage.',
      ],
    },
    {
      title: 'Software Engineer & DevOps Engineer',
      company: 'Business Switch Philippines Inc.',
      location: 'Pasay City, PH',
      badge: 'Software & DevOps',
      dateRange: 'Jun 2016 - Apr 2020',
      isCurrent: false,
      technologies: ['Node.js', 'AWS Lambda', 'Docker', 'Angular', 'AWS CDK', 'Bash'],
      items: [
        'Developed serverless microservices and containerized applications on AWS, reducing operational overhead.',
        'Pioneered Angular adoption and Infrastructure-as-Code practices to streamline full-stack delivery.',
        'Built automated CI/CD pipelines that significantly shortened release cycles and deployment risk.',
      ],
    },
  ];
}
