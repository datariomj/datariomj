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
      metrics: [
        { label: 'Uptime Ratio', value: '100.0%' },
        { label: 'Deployments Managed', value: '> 5,000' },
        { label: 'Legacy Migration', value: '100% Containers' },
      ],
      items: [
        'Lead DevOps team in implementing CI/CD best practices and infrastructure management strategies',
        'Drive migration of legacy systems to scalable, cloud-native architectures',
        'Mentor DevOps engineers while cultivating a culture of continuous improvement and innovation',
        'Spearhead comprehensive disaster recovery planning and implementation initiatives',
        'Pioneer AI-powered automation within CI/CD pipelines to enhance deployment efficiency',
        'Orchestrate investigations and rapid resolution of critical production incidents',
        'Built a Python-based DevOps Slack agent deployed on Kubernetes to automate team request handling',
        'Architected and deployed GitOps-controlled CI/CD infrastructure using Jenkins on AWS',
        'Automated end-to-end release management workflows leveraging Jenkins and AWS cloud services',
        'Successfully migrated legacy CI/CD tools (Octopus Deploy & TeamCity) to unified Jenkins platform',
        'Migrated legacy on-prem .NET IIS sites to containerized Kubernetes on AWS EKS',
        'Implemented pipeline guardrails and audit controls to track production releases',
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
      metrics: [
        { label: 'IaC Compliance', value: '100%' },
        { label: 'Cluster Scope', value: 'Multi-Region EKS' },
      ],
      items: [
        'Implemented automated monitoring, alerting, and security audit frameworks using Terraform',
        'Managed production Kubernetes clusters and Helm deployments through IAC principles',
        'Enforced Compliance and Policy as Code using Cloud Custodian and Checkov',
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
      metrics: [
        { label: 'E2E QA Coverage', value: '> 90%' },
      ],
      items: [
        'Engineered enterprise CRM application using Angular framework',
        'Implemented comprehensive test automation suite with Cypress for quality assurance',
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
      metrics: [
        { label: 'Cost Reduction', value: '65%' },
        { label: 'Deployment Time', value: '-80%' },
      ],
      items: [
        'Architected and deployed serverless microservices using Node.js and AWS Lambda',
        'Pioneered Angular adoption and containerized application development with Docker',
        'Achieved 65% reduction in operational costs through infrastructure optimization',
        'Introduced Infrastructure as Code methodology using AWS CDK with TypeScript',
        'Established automated CI/CD pipelines using AWS CodeBuild and CodePipeline',
      ],
    },
  ];
}
