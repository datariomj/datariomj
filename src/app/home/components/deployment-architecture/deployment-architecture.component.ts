import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from "@angular/core";

export interface NodeDetail {
  id: string;
  title: string;
  category: string;
  visibility?: "PUBLIC" | "PRIVATE" | "INTERNAL";
  icon: string;
  accentColor: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  specs: string[];
  link?: { url: string; label: string };
}

@Component({
  selector: "app-deployment-architecture",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./deployment-architecture.component.html",
  styleUrls: ["./deployment-architecture.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeploymentArchitectureComponent {
  private cdr = inject(ChangeDetectorRef);
  selectedNodeId: string | null = null;

  readonly nodeDetails: Record<string, NodeDetail> = {
    datariomj: {
      id: "datariomj",
      title: "datariomj",
      category: "Source Control / Frontend Repository",
      visibility: "PUBLIC",
      icon: "icon-angular",
      accentColor: "cyan",
      shortDesc: "Main Angular 19 Single Page Application & Portfolio",
      fullDesc:
        "The core frontend repository hosting the developer portfolio website. Built using Angular 19 with Standalone Components, Tailwind CSS, NGXS state management, KaTeX math rendering, and SSR pre-rendering capability.",
      techStack: ["Angular 19", "TypeScript", "Tailwind CSS", "NGXS", "RxJS"],
      specs: [
        "Repository: github.com/datariomj/datariomj",
        "Build System: Angular CLI / esbuild",
        "Deployment: AWS S3 + CloudFront CDN via Azure DevOps",
      ],
      link: { url: "https://github.com/datariomj/datariomj", label: "View Public GitHub Repository" },
    },
    "datariomj-infra": {
      id: "datariomj-infra",
      title: "datariomj-infra",
      category: "Source Control / Infrastructure as Code",
      visibility: "PRIVATE",
      icon: "icon-infra",
      accentColor: "amber",
      shortDesc: "AWS CDK Monorepo for Cloud Infrastructure Provisioning",
      fullDesc:
        "Private infrastructure-as-code monorepo powered by AWS CDK in TypeScript. Defines, synthesizes, and provisions all AWS cloud resources including Route 53 hosted zones, S3 static hosting buckets with OAI security, CloudFront CDN distributions, ACM certificates, and budget alerts.",
      techStack: ["AWS CDK v2", "TypeScript", "Amazon S3", "CloudFront", "Route 53", "ACM"],
      specs: [
        "Repository: github.com/datariomj/datariomj-infra",
        "IaC Target: AWS Cloud Infrastructure",
        "Security: Origin Access Identity (OAI) & IAM Roles",
      ],
    },
    "datariomj-sentry": {
      id: "datariomj-sentry",
      title: "datariomj-sentry",
      category: "Source Control / Observability IaC",
      visibility: "PRIVATE",
      icon: "icon-sentry",
      accentColor: "rose",
      shortDesc: "Pulumi Stack for Sentry Projects & Environment DSNs",
      fullDesc:
        "Private IaC project using Pulumi (TypeScript) to declaratively manage Sentry organizations, projects, alert rules, team permissions, and environment DSN aliases for production and staging error tracking.",
      techStack: ["Pulumi", "TypeScript", "Sentry API", "Error Monitoring"],
      specs: [
        "Repository: github.com/datariomj/datariomj-sentry",
        "Scope: Sentry Projects, Teams, Alert Rules & DSN Secrets",
        "State Storage: Pulumi Cloud Service",
      ],
    },
    "datariomj-azdo": {
      id: "datariomj-azdo",
      title: "datariomj-azdo",
      category: "Source Control / Operations IaC",
      visibility: "PRIVATE",
      icon: "icon-azdo",
      accentColor: "violet",
      shortDesc: "Pulumi Infrastructure Code for Azure DevOps & CI/CD",
      fullDesc:
        "Private Pulumi repository managing Azure DevOps project configurations, self-hosted agent pools, build queues, GitHub service connections, pipeline variable groups, and deployment security checks.",
      techStack: ["Pulumi", "Azure DevOps REST API", "TypeScript", "CI/CD"],
      specs: [
        "Repository: github.com/datariomj/datariomj-azure-devops",
        "Automated Setup: Agent pools, Service Connections & Pipelines",
        "Security: Variable Groups with Azure Key Vault secrets",
      ],
    },
    "datariomj-azp-agent": {
      id: "datariomj-azp-agent",
      title: "datariomj-azp-agent",
      category: "Source Control / Docker Agent",
      visibility: "PRIVATE",
      icon: "icon-docker",
      accentColor: "emerald",
      shortDesc: "Dockerized Azure DevOps Self-Hosted Agent Image",
      fullDesc:
        "Custom Dockerfile and startup orchestration scripts for the self-hosted Azure DevOps build agent. Pre-configured with Node.js, Angular CLI, Cypress dependencies, AWS CLI, and Git tooling.",
      techStack: ["Docker", "Bash", "Azure DevOps Agent", "Node.js", "AWS CLI"],
      specs: [
        "Repository: github.com/datariomj/datariomj-azp-agent",
        "Runtime: Containerized execution with host toolchain isolation",
        "Capabilities: npm caching, headless Cypress browser testing",
      ],
    },
    agent: {
      id: "agent",
      title: "Self-Hosted Agent",
      category: "CI/CD Pipeline / Execution Runner",
      visibility: "INTERNAL",
      icon: "icon-docker",
      accentColor: "emerald",
      shortDesc: "Self-Hosted Docker Agent Runner for Azure DevOps",
      fullDesc:
        "Dedicated self-hosted container instance registered to the Azure DevOps Agent Pool. Listens for pipeline execution requests and runs pipeline jobs locally with high build speed and zero queue wait times.",
      techStack: ["Azure DevOps Pool", "Docker Daemon", "Node.js 22", "Git"],
      specs: [
        "Pool Name: SelfHosted",
        "Concurrency: Isolated job execution per pipeline run",
        "Speed Advantage: Fast local disk caching for npm packages & Docker layers",
      ],
    },
    lint: {
      id: "lint",
      title: "Lint Stage",
      category: "CI/CD Pipeline Stage",
      visibility: "INTERNAL",
      icon: "icon-lint",
      accentColor: "cyan",
      shortDesc: "Static Code & Style Linting Stage",
      fullDesc:
        "Enforces strict code quality standards, TypeScript typechecking, ESLint rules, and Stylelint formatting guidelines across all source code before allowing downstream build operations.",
      techStack: ["ESLint", "Stylelint", "TypeScript compiler (`tsc`)", "Prettier"],
      specs: [
        "Checks: Code formatting, unused variables, type safety",
        "Gate: Must pass with 0 errors to advance to Test stage",
      ],
    },
    test: {
      id: "test",
      title: "Test Stage",
      category: "CI/CD Pipeline Stage",
      visibility: "INTERNAL",
      icon: "icon-test",
      accentColor: "cyan",
      shortDesc: "Automated Unit & End-to-End Testing Stage",
      fullDesc:
        "Runs Vitest unit tests, Angular component tests, and Cypress E2E integration specs. Generates code coverage reports uploaded to Codecov and Codacy quality gates.",
      techStack: ["Vitest", "Cypress", "Codecov", "Codacy"],
      specs: [
        "Unit Tests: Component, service, and state store spec execution",
        "E2E Tests: Headless Cypress user journey tests",
        "Coverage Threshold: Enforces code coverage benchmarks",
      ],
    },
    build: {
      id: "build",
      title: "Build Stage",
      category: "CI/CD Pipeline Stage",
      visibility: "INTERNAL",
      icon: "icon-build",
      accentColor: "cyan",
      shortDesc: "Production Angular Bundle Compilation & Source Map Generation",
      fullDesc:
        "Executes `ng build --configuration=production` to output minified JavaScript bundles, optimized CSS, static pre-rendered HTML routes, and Sentry debug sourcemaps.",
      techStack: ["Angular CLI", "esbuild", "Sentry CLI"],
      specs: [
        "Artifacts: Minified JS chunks, CSS, static assets",
        "Sourcemaps: Uploads release sourcemaps directly to Sentry",
      ],
    },
    deploy: {
      id: "deploy",
      title: "Deploy Stage",
      category: "CI/CD Pipeline Stage",
      visibility: "INTERNAL",
      icon: "icon-deploy",
      accentColor: "amber",
      shortDesc: "AWS S3 Sync & CloudFront Invalidation Stage",
      fullDesc:
        "Syncs built frontend artifacts to target S3 bucket (`aws s3 sync --delete`) and triggers a CloudFront CDN edge cache invalidation (`aws cloudfront create-invalidation`) for instant deployment.",
      techStack: ["AWS CLI", "S3 API", "CloudFront API"],
      specs: [
        "Prod Target: datariomj.dev S3 bucket + CloudFront ID",
        "Staging Target: staging.datariomj.dev S3 bucket + CloudFront ID",
        "Cache Invalidation: `/*` edge purge for zero-downtime updates",
      ],
    },
    publish: {
      id: "publish",
      title: "Publish Stage",
      category: "CI/CD Pipeline Stage",
      visibility: "INTERNAL",
      icon: "icon-publish",
      accentColor: "cyan",
      shortDesc: "Automated GitHub Release & Changelog Generation",
      fullDesc:
        "Extracts conventional commit history using `git-cliff` to automatically generate release notes, bump release version tags, and create official GitHub Releases on production merges.",
      techStack: ["git-cliff", "GitHub REST API", "Git Tags"],
      specs: [
        "Trigger: Execution on successful `main` branch merges",
        "Artifacts: Standardized release changelogs & version tags",
      ],
    },
    sentry: {
      id: "sentry",
      title: "Sentry",
      category: "Observability / Error Monitoring",
      visibility: "PUBLIC",
      icon: "icon-sentry",
      accentColor: "rose",
      shortDesc: "Real-Time Frontend Exception & Performance Monitoring",
      fullDesc:
        "Captures uncaught JavaScript errors, network failures, performance bottlenecks, and user breadcrumbs in real-time. Matches minified stack traces against uploaded source maps.",
      techStack: ["Sentry SDK", "TypeScript", "Source Maps", "Alerts"],
      specs: [
        "Features: Error grouping, release tracking, user environment metadata",
        "Environment Aliases: Separate tracking for production and staging",
      ],
    },
    codecov: {
      id: "codecov",
      title: "Codecov",
      category: "Observability / Code Coverage",
      visibility: "PUBLIC",
      icon: "icon-codecov",
      accentColor: "emerald",
      shortDesc: "Automated Test Coverage Reporting & Pull Request Comments",
      fullDesc:
        "Aggregates test coverage reports from unit and integration test runs. Computes line and branch coverage percentages, displaying delta badges on GitHub Pull Requests.",
      techStack: ["Codecov API", "LCOV", "GitHub Actions / AzDO"],
      specs: [
        "Reports: Detailed line-by-line coverage heatmaps",
        "PR Checks: Enforces non-regressive coverage threshold rules",
      ],
    },
    codacy: {
      id: "codacy",
      title: "Codacy",
      category: "Observability / Static Analysis",
      visibility: "PUBLIC",
      icon: "icon-codacy",
      accentColor: "emerald",
      shortDesc: "Automated Static Code Quality & Security Scanning",
      fullDesc:
        "Performs automated static code analysis, security vulnerability scanning, code complexity auditing, and duplicate code detection across every pull request.",
      techStack: ["Codacy Engine", "Security Scanners", "Code Duplication Audit"],
      specs: [
        "Quality Gates: Blocks merging if security vulnerabilities are found",
        "Standards: OWASP Top 10 compliance checks",
      ],
    },
    cypress: {
      id: "cypress",
      title: "Cypress",
      category: "Observability / E2E Testing",
      visibility: "PUBLIC",
      icon: "icon-cypress",
      accentColor: "emerald",
      shortDesc: "End-to-End User Journey Test Automation",
      fullDesc:
        "Executes browser-level end-to-end integration tests simulating real user navigation, interactive UI features, terminal hero commands, and page routing.",
      techStack: ["Cypress", "Headless Chrome/Firefox", "DOM Inspection"],
      specs: [
        "Artifacts: Test video recordings, failure DOM screenshots",
        "Assertions: Viewport responsiveness and navigation link integrity",
      ],
    },
    uptimerobot: {
      id: "uptimerobot",
      title: "UptimeRobot",
      category: "Observability / Availability Monitoring",
      visibility: "PUBLIC",
      icon: "icon-uptimerobot",
      accentColor: "emerald",
      shortDesc: "24/7 Endpoint Ping & SLA Availability Monitor",
      fullDesc:
        "Monitors live production and staging endpoints at 5-minute intervals. Tracks HTTP status codes, response latency, SSL certificate expiration, and 30-day uptime percentage.",
      techStack: ["UptimeRobot API", "HTTP Head Pings", "SSL Monitors"],
      specs: [
        "Interval: 5-minute automated global pings",
        "Alerting: Instant notifications on latency spikes or downtime",
      ],
    },
    route53: {
      id: "route53",
      title: "Route 53",
      category: "AWS Infrastructure / Domain Name System",
      visibility: "PUBLIC",
      icon: "icon-route53",
      accentColor: "amber",
      shortDesc: "AWS Managed DNS & Hosted Zone Routing",
      fullDesc:
        "AWS Route 53 public hosted zone for `datariomj.dev`. Manages apex A records, CNAME alias routing to CloudFront CDN endpoints, and TXT verification records.",
      techStack: ["AWS Route 53", "DNS Apex Alias", "CNAME Routing"],
      specs: [
        "Domain: datariomj.dev",
        "Routing: Alias A record to CloudFront CDN distribution",
        "SLA: 100% DNS availability SLA",
      ],
    },
    cloudfront: {
      id: "cloudfront",
      title: "CloudFront",
      category: "AWS Infrastructure / Global CDN",
      visibility: "PUBLIC",
      icon: "icon-cloudfront",
      accentColor: "amber",
      shortDesc: "Global Edge Content Delivery Network & HTTPS Termination",
      fullDesc:
        "Amazon CloudFront distribution caching static website assets across global edge locations. Provides TLS 1.3 encryption, Gzip/Brotli compression, and Origin Access Identity.",
      techStack: ["AWS CloudFront", "Edge Caching", "TLS 1.3", "Brotli"],
      specs: [
        "Edge Locations: Global low-latency CDN distribution",
        "Security: Restricts S3 bucket access via OAI policy",
        "Custom SSL: ACM SSL certificate (`us-east-1`)",
      ],
    },
    s3: {
      id: "s3",
      title: "S3 Bucket",
      category: "AWS Infrastructure / Static Hosting Storage",
      visibility: "PUBLIC",
      icon: "icon-s3",
      accentColor: "amber",
      shortDesc: "Amazon S3 Static Website Storage Bucket",
      fullDesc:
        "Amazon S3 bucket storing compiled Angular production assets, JavaScript bundles, CSS stylesheets, images, and static HTML pages. Secured with private access policy.",
      techStack: ["Amazon S3", "OAI Policy", "Static Object Storage"],
      specs: [
        "Bucket Access: Blocked public direct access; CloudFront OAI only",
        "Sync Command: `aws s3 sync --delete` in deployment pipeline",
      ],
    },
    acm: {
      id: "acm",
      title: "ACM (AWS Certificate Manager)",
      category: "AWS Infrastructure / SSL/TLS Certificates",
      visibility: "PUBLIC",
      icon: "icon-acm",
      accentColor: "amber",
      shortDesc: "Managed SSL/TLS Certificates for *.datariomj.dev",
      fullDesc:
        "AWS Certificate Manager (ACM) provisions, manages, and automatically renews public SSL/TLS certificates for datariomj.dev and staging.datariomj.dev in the us-east-1 region for CloudFront CDN edge distribution.",
      techStack: ["AWS ACM", "SSL/TLS", "X.509 Certificates", "CloudFront Integration"],
      specs: [
        "Region: us-east-1 (Global CloudFront requirement)",
        "Domain: *.datariomj.dev, datariomj.dev",
        "Renewal: Automated 100% managed renewal by AWS",
      ],
    },
    prod: {
      id: "prod",
      title: "https://datariomj.dev",
      category: "End Users / Live Production Endpoint",
      visibility: "PUBLIC",
      icon: "icon-user",
      accentColor: "cyan",
      shortDesc: "Live Production Endpoint (datariomj.dev)",
      fullDesc:
        "Primary production URL serving the live portfolio website to end users worldwide via CloudFront CDN edge nodes.",
      techStack: ["Production", "HTTPS", "CloudFront Edge"],
      specs: [
        "URL: https://datariomj.dev",
        "Branch Source: `main`",
        "Monitoring: UptimeRobot 24/7 SLA check",
      ],
      link: { url: "https://datariomj.dev", label: "Open Live Production Website" },
    },
    staging: {
      id: "staging",
      title: "https://staging.datariomj.dev",
      category: "End Users / Staging Environment Endpoint",
      visibility: "PUBLIC",
      icon: "icon-user",
      accentColor: "cyan",
      shortDesc: "Live Staging Environment Endpoint (staging.datariomj.dev)",
      fullDesc:
        "Staging preview URL used to validate pre-release builds and pull requests before merging into production.",
      techStack: ["Staging", "HTTPS", "CloudFront Edge"],
      specs: [
        "URL: https://staging.datariomj.dev",
        "Branch Source: `release`",
        "Use Case: QA verification and preview testing",
      ],
      link: { url: "https://staging.datariomj.dev", label: "Open Staging Preview Website" },
    },
  };

  get currentNode(): NodeDetail | null {
    return this.selectedNodeId ? this.nodeDetails[this.selectedNodeId] || null : null;
  }

  selectNode(nodeId: string): void {
    const node = this.nodeDetails[nodeId];
    if (node?.link?.url && (nodeId === "prod" || nodeId === "staging")) {
      window.open(node.link.url, "_blank");
      return;
    }
    this.selectedNodeId = nodeId;
    this.cdr.markForCheck();
  }

  closeDetail(): void {
    this.selectedNodeId = null;
    this.cdr.markForCheck();
  }

  handleKeydown(event: KeyboardEvent, nodeId: string): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.selectNode(nodeId);
    }
  }
}
