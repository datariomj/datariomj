import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

export interface StatusBadge {
  key: string;
  alt: string;
  imgSrc: string;
  href: string;
}

@Component({
  selector: 'app-status-badges',
  templateUrl: './status-badges.component.html',
  styleUrl: './status-badges.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgesComponent {
  statusCurlCommand = `curl -s ${ window.location.origin }/status.json | jq`;
  serviceName = window.location.host || 'datariomj.dev';

  badges: StatusBadge[] = [
    {
      key: 'build',
      alt: 'Build Status',
      imgSrc: 'https://dev.azure.com/mrcjsph/datariomj/_apis/build/status%2FAzure%20Pipelines%20datariomj-ci-cd?branchName=main',
      href: 'https://dev.azure.com/mrcjsph/datariomj/_build/latest?definitionId=5&branchName=main',
    },
    {
      key: 'e2e',
      alt: 'Cypress E2E',
      imgSrc: 'https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/3zwyy9/main&style=flat&logo=cypress',
      href: 'https://dashboard.cypress.io/projects/3zwyy9/runs',
    },
    {
      key: 'quality',
      alt: 'Codacy Grade',
      imgSrc: 'https://app.codacy.com/project/badge/Grade/7436259e99ee41a7b58f146322089397',
      href: 'https://app.codacy.com/gh/datariomj/datariomj/dashboard',
    },
    {
      key: 'codecov',
      alt: 'Codecov',
      imgSrc: 'https://img.shields.io/codecov/c/github/datariomj/datariomj/main',
      href: 'https://app.codecov.io/gh/datariomj/datariomj',
    },
    {
      key: 'uptime',
      alt: 'Uptime Robot ratio (30 days)',
      imgSrc: 'https://img.shields.io/uptimerobot/ratio/m796216246-33192eac05ffcc04bd1cd411',
      href: 'https://stats.uptimerobot.com/AGzj9HrMEo',
    },
    {
      key: 'version',
      alt: 'Version',
      imgSrc: 'https://img.shields.io/github/v/release/datariomj/datariomj',
      href: 'https://github.com/datariomj/datariomj/releases',
    },
    {
      key: 'license',
      alt: 'License',
      imgSrc: 'https://img.shields.io/github/license/datariomj/datariomj',
      href: 'https://github.com/datariomj/datariomj/blob/main/LICENSE.md',
    },
  ];
}
