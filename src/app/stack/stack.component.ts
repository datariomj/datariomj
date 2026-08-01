import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TerminalHeroComponent } from '../shared/components/terminal-hero/terminal-hero.component';

export interface StackItem {
  command: string;
  name: string;
  status: string;
  description: string;
}

export interface StackCategory {
  id: string;
  title: string;
  subtitle: string;
  items: StackItem[];
}

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TerminalHeroComponent, FormsModule],
})
export class StackComponent {
  private cdr = inject(ChangeDetectorRef);

  selectedCategory: 'all' | 'ops' | 'iac' | 'dev' = 'all';
  searchQuery = '';
  sortBy: 'default' | 'name' | 'status' = 'default';

  rawCategories: StackCategory[] = [
    {
      id: 'ops',
      title: '01_OPERATIONS_AND_SRE',
      subtitle: '[OBSERVABILITY // SCALE]',
      items: [
        {
          command: '$ ls tools/monitoring',
          name: 'Prometheus & Grafana',
          status: '[ RUNNING ]',
          description: 'Metric aggregation and visual intelligence for high-cardinality distributed systems.',
        },
        {
          command: '$ ls tools/orchestration',
          name: 'Kubernetes & Helm',
          status: '[ RUNNING ]',
          description: 'Container orchestration for microservices architecture with service mesh integration.',
        },
        {
          command: '$ ls tools/ci-cd',
          name: 'ArgoCD, Jenkins & GH Actions',
          status: '[ RUNNING ]',
          description: 'Declarative GitOps continuous delivery and pipeline automation.',
        },
        {
          command: '$ ls tools/core',
          name: 'Docker & Linux',
          status: '[ RUNNING ]',
          description: 'Core containerization and operating system fundamentals.',
        },
      ],
    },
    {
      id: 'iac',
      title: '02_INFRASTRUCTURE_AS_CODE',
      subtitle: '[IMMUTABILITY // AUTOMATION]',
      items: [
        {
          command: '$ terraform plan',
          name: 'Terraform, Pulumi & CDK',
          status: '[ STABLE ]',
          description: 'Declarative resource management and modern infrastructure as code.',
        },
        {
          command: '$ aws configure',
          name: 'AWS, Azure & GCP',
          status: '[ STABLE ]',
          description: 'Multi-cloud architecture, networking, and cloud-native service management.',
        },
        {
          command: '$ vault status',
          name: 'HashiCorp Vault',
          status: '[ STABLE ]',
          description: 'Secrets management, encryption as a service, and identity-based access.',
        },
      ],
    },
    {
      id: 'dev',
      title: '03_APPLICATION_DEVELOPMENT',
      subtitle: '[DELIVERY // PIPELINES]',
      items: [
        {
          command: '$ npm start',
          name: 'Angular, Node.js & TS',
          status: '[ ACTIVE ]',
          description: 'Full-stack web application development and typed JavaScript ecosystem.',
        },
        {
          command: '$ psql -U admin',
          name: 'SQL & MongoDB',
          status: '[ ACTIVE ]',
          description: 'Relational and NoSQL database administration, schema design, and querying.',
        },
      ],
    },
  ];

  get filteredCategories(): StackCategory[] {
    const query = this.searchQuery.trim().toLowerCase();

    return this.rawCategories
      .filter((cat) => this.selectedCategory === 'all' || cat.id === this.selectedCategory)
      .map((cat) => {
        let matchingItems = cat.items.filter((item) => {
          if (!query) return true;
          return (
            item.name.toLowerCase().includes(query) ||
            item.command.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query)
          );
        });

        if (this.sortBy === 'name') {
          matchingItems = [...matchingItems].sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortBy === 'status') {
          matchingItems = [...matchingItems].sort((a, b) => a.status.localeCompare(b.status));
        }

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }

  get totalItems(): number {
    return this.rawCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }

  get totalVisibleItems(): number {
    return this.filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }

  setCategory(cat: 'all' | 'ops' | 'iac' | 'dev'): void {
    this.selectedCategory = cat;
    this.cdr.markForCheck();
  }

  onSearchInput(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.cdr.markForCheck();
  }

  setSortBy(sort: 'default' | 'name' | 'status'): void {
    this.sortBy = sort;
    this.cdr.markForCheck();
  }

  resetFilters(): void {
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'default';
    this.cdr.markForCheck();
  }
}
