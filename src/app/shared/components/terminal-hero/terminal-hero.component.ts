import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

export interface TerminalOutputItem {
  type: 'command' | 'output' | 'output-success' | 'output-error';
  text: string;
  html?: string;
}

@Component({
  selector: 'app-terminal-hero',
  templateUrl: './terminal-hero.component.html',
  styleUrl: './terminal-hero.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.home-terminal]': 'isHomePage',
  },
})
export class TerminalHeroComponent implements OnInit {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @Input() isError = false;
  @Input() errorSlug = '';

  @Input() initialCommand?: string;
  @Input() initialPath?: string;
  @Input() initialOutput?: TerminalOutputItem[];

  @ViewChild('terminalInput') terminalInput!: ElementRef<HTMLInputElement>;
  @ViewChild('terminalContent') terminalContent!: ElementRef<HTMLDivElement>;

  history: TerminalOutputItem[] = [];
  isTyping = false;
  isFocused = false;
  isClosed = false;
  currentPath = '';
  activeCommand = '';
  activeOutput: TerminalOutputItem[] = [];

  closeTerminal(event: Event): void {
    event.stopPropagation();
    this.isClosed = true;
    this.cdr.markForCheck();
  }

  reconnect(): void {
    this.isClosed = false;
    this.runInitialSequence();
  }

  ngOnInit(): void {
    if (this.isError) {
      this.currentPath = this.initialPath || 'error';
      this.activeCommand = this.initialCommand || `curl -I /${ this.errorSlug || 'unknown-route' }`;
      this.activeOutput = this.initialOutput || [
        { type: 'output-error', text: 'HTTP/1.1 404 Not Found' },
        { type: 'output', text: `Date: ${ new Date().toUTCString() }\nContent-Type: text/html; charset=UTF-8\n\n[ERROR] ROUTE_NOT_FOUND: The page you are looking for might have been removed or is temporarily unavailable.` },
      ];
    } else {
      const url = this.router.url;
      if (url.includes('experience')) {
        this.currentPath = this.initialPath || 'experience';
        this.activeCommand = this.initialCommand || 'cd /experience';
        this.activeOutput = this.initialOutput || [
          {
            type: 'output',
            text: 'target: /experience\ntype: TIMELINE\nsummary: CI/CD Automation & Enterprise Reliability Engineering (>5k deployments)',
            html: '<div class="font-mono" style="line-height:1.6;"><span class="term-key">target: </span><span class="term-val">/experience</span><br/><span class="term-key">type: </span><span class="term-val">TIMELINE</span><br/><span class="term-key">summary: </span><span class="term-val">CI/CD Automation &amp; Enterprise Reliability Engineering (&gt;5k deployments)</span></div>',
          },
        ];
      } else if (url.includes('stack')) {
        this.currentPath = this.initialPath || 'stack';
        this.activeCommand = this.initialCommand || 'cd /stack';
        this.activeOutput = this.initialOutput || [
          {
            type: 'output',
            text: 'target: /stack\ntype: INFRASTRUCTURE\nsummary: AWS, Kubernetes, Terraform & Zero-Trust Cloud Architecture',
            html: '<div class="font-mono" style="line-height:1.6;"><span class="term-key">target: </span><span class="term-val">/stack</span><br/><span class="term-key">type: </span><span class="term-val">INFRASTRUCTURE</span><br/><span class="term-key">summary: </span><span class="term-val">AWS, Kubernetes, Terraform &amp; Zero-Trust Cloud Architecture</span></div>',
          },
        ];
      } else if (url.includes('contact')) {
        this.currentPath = this.initialPath || 'contact';
        this.activeCommand = this.initialCommand || 'cd /contact';
        this.activeOutput = this.initialOutput || [
          {
            type: 'output',
            text: 'target: /contact\ntype: INGRESS\nsummary: Open for engineering leadership & cloud architecture collaboration',
            html: '<div class="font-mono" style="line-height:1.6;"><span class="term-key">target: </span><span class="term-val">/contact</span><br/><span class="term-key">type: </span><span class="term-val">INGRESS</span><br/><span class="term-key">summary: </span><span class="term-val">Open for engineering leadership &amp; cloud architecture collaboration</span></div>',
          },
        ];
      } else if (url.includes('about')) {
        this.currentPath = this.initialPath || 'about';
        this.activeCommand = this.initialCommand || 'cd /about';
        this.activeOutput = this.initialOutput || [
          {
            type: 'output',
            text: 'target: /about\ntype: OVERVIEW\nsummary: Computer Engineering @ BSU | Cloud Infrastructure & Automation',
            html: '<div class="font-mono" style="line-height:1.6;"><span class="term-key">target: </span><span class="term-val">/about</span><br/><span class="term-key">type: </span><span class="term-val">OVERVIEW</span><br/><span class="term-key">summary: </span><span class="term-val">Computer Engineering @ BSU | Cloud Infrastructure &amp; Automation</span></div>',
          },
        ];
      } else {
        // Home page default (url === '/')
        this.currentPath = this.initialPath || '';
        this.activeCommand = this.initialCommand || 'cd /';
        this.activeOutput = this.initialOutput || [
          {
            type: 'output',
            text: 'target: /\ntype: PROFILE\nsummary: Marc Joseph Datario — DevOps Lead & Cloud Architect',
            html: '<div class="font-mono" style="line-height:1.6;"><span class="term-key">target: </span><span class="term-val">/</span><br/><span class="term-key">type: </span><span class="term-val">PROFILE</span><br/><span class="term-key">summary: </span><span class="term-val">Marc Joseph Datario — DevOps Lead &amp; Cloud Architect</span></div>',
          },
        ];
        this.isHomePage = !this.initialCommand;
      }
    }

    this.runInitialSequence();
  }

  isHomePage = false;

  runInitialSequence(): void {
    this.isTyping = true;
    this.history = [];

    const command = this.activeCommand;
    let index = 0;

    // Simulate initial typing of navigation command
    const interval = setInterval(() => {
      if (index < command.length) {
        index++;
        this.history = [
          { type: 'command', text: command.slice(0, index) },
        ];
        this.cdr.markForCheck();
      } else {
        clearInterval(interval);
        this.isTyping = false;

        // Print page-specific output
        this.printPageStatus();
        this.cdr.markForCheck();
        this.scrollToBottom();

        // On home page: auto-run the status curl command after a short pause
        if (this.isHomePage) {
          setTimeout(() => this.runStatusSequence(), 150);
        } else {
          setTimeout(() => { this.focusInput(); }, 50);
        }
      }
    }, 80);
  }

  runStatusSequence(): void {
    this.isTyping = true;
    const command = `curl -s ${ window.location.origin }/status.json | jq`;
    let index = 0;

    this.history.push({ type: 'command', text: '' });
    this.cdr.markForCheck();

    const interval = setInterval(() => {
      if (index < command.length) {
        index++;
        this.history = [
          ...this.history.slice(0, -1),
          { type: 'command', text: command.slice(0, index) },
        ];
        this.cdr.markForCheck();
      } else {
        clearInterval(interval);
        this.isTyping = false;
        this.history.push({
          type: 'output',
          text: 'curl status.json response',
          html: this.buildStatusBadgesHtml(),
        });
        this.history.push({ type: 'output', text: 'Type "help" to view available commands.' });
        this.cdr.markForCheck();
        this.scrollToBottom();
        setTimeout(() => { this.focusInput(); }, 50);
      }
    }, 15);
  }

  buildStatusBadgesHtml(): string {
    const serviceName = typeof window !== 'undefined' && window.location?.host ? window.location.host : 'datariomj.dev';
    const badges = [
      { key: 'build', alt: 'Build Status', href: 'https://dev.azure.com/mrcjsph/datariomj/_build/latest?definitionId=5&branchName=main', imgSrc: 'https://dev.azure.com/mrcjsph/datariomj/_apis/build/status%2FAzure%20Pipelines%20datariomj-ci-cd?branchName=main' },
      { key: 'e2e', alt: 'Cypress E2E', href: 'https://dashboard.cypress.io/projects/3zwyy9/runs', imgSrc: 'https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/3zwyy9/main&style=flat&logo=cypress' },
      { key: 'quality', alt: 'Codacy Grade', href: 'https://app.codacy.com/gh/datariomj/datariomj/dashboard', imgSrc: 'https://app.codacy.com/project/badge/Grade/7436259e99ee41a7b58f146322089397' },
      // { key: 'snyk', alt: 'Snyk Security', href: 'https://snyk.io/test/github/datariomj/datariomj', imgSrc: 'https://snyk.io/test/github/datariomj/datariomj/badge.svg' },
      { key: 'codecov', alt: 'Codecov', href: 'https://app.codecov.io/gh/datariomj/datariomj', imgSrc: 'https://img.shields.io/codecov/c/github/datariomj/datariomj/main' },
      { key: 'uptime', alt: 'Uptime Robot (30d)', href: 'https://stats.uptimerobot.com/AGzj9HrMEo', imgSrc: 'https://img.shields.io/uptimerobot/ratio/m796216246-33192eac05ffcc04bd1cd411' },
      { key: 'version', alt: 'Version', href: 'https://github.com/datariomj/datariomj/releases', imgSrc: 'https://img.shields.io/github/v/release/datariomj/datariomj' },
      { key: 'license', alt: 'License', href: 'https://github.com/datariomj/datariomj/blob/main/LICENSE.md', imgSrc: 'https://img.shields.io/github/license/datariomj/datariomj' },
    ];

    const rows = badges.map((b, i) => {
      const comma = i < badges.length - 1 ? '<span class="json-comma">,</span>' : '';
      return `<div class="terminal-line json-indent-2 json-badge-row"><span class="json-key">"${ b.key }"</span><span class="json-colon">: </span><a href="${ b.href }" target="_blank" rel="noopener noreferrer" class="inline-badge-link" title="${ b.alt }"><img src="${ b.imgSrc }" alt="${ b.alt }" height="20" loading="lazy" class="badge-img" /></a>${ comma }</div>`;
    }).join('');

    return `<div class="font-mono" style="line-height:1.8;"><div class="terminal-line"><span class="json-brace">{</span></div><div class="terminal-line json-indent"><span class="json-key">"service"</span><span class="json-colon">: </span><span class="json-string">"${ serviceName }"</span><span class="json-comma">,</span></div><div class="terminal-line json-indent" style="margin-bottom:0.35rem;"><span class="json-key">"checks"</span><span class="json-colon">: </span><span class="json-brace">{</span></div>${ rows }<div class="terminal-line json-indent"><span class="json-brace">}</span></div><div class="terminal-line"><span class="json-brace">}</span></div></div>`;
  }

  printPageStatus(): void {
    this.history.push(...this.activeOutput);
    // On home page the help hint is deferred until after the status sequence
    if (!this.isHomePage) {
      this.history.push({ type: 'output', text: 'Type "help" to view available commands.' });
    }
  }

  getCurrentRouteName(): string {
    const url = this.router.url;
    if (url.includes('about')) return 'about';
    if (url.includes('experience')) return 'experience';
    if (url.includes('stack')) return 'stack';
    if (url.includes('contact')) return 'contact';
    return 'home';
  }

  suggestions: string[] = [];
  inputValue = '';
  ghostText = '';

  onInputChange(value: string): void {
    this.inputValue = value;
    const parts = value.trimStart().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    if (parts.length > 1 && (cmd === 'cd' || cmd === 'cat')) {
      const currentRoute = this.getCurrentRouteName();
      const targets = cmd === 'cd'
        ? ['about', 'about.md', 'experience', 'experience.md', 'stack', 'stack.md', 'contact', 'contact.md'].filter(r => !r.startsWith(currentRoute))
        : ['about.md', 'about', 'experience.md', 'experience', 'stack.md', 'stack', 'contact.md', 'contact'].filter(f => !f.startsWith(currentRoute));

      this.suggestions = targets.filter(t => t.startsWith(arg));

      if (this.suggestions.length > 0) {
        this.ghostText = this.suggestions[0].slice(arg.length);
      } else {
        this.ghostText = '';
      }
    } else {
      this.suggestions = [];
      this.ghostText = '';
    }
  }

  onTab(event: Event, inputElement: HTMLInputElement): void {
    event.preventDefault(); // Prevent tab focus change
    if (this.suggestions.length > 0) {
      const parts = inputElement.value.trimStart().split(/\s+/);
      const cmd = parts[0];
      inputElement.value = `${ cmd } ${ this.suggestions[0] }`;
      this.inputValue = inputElement.value;
      this.suggestions = [];
      this.ghostText = '';
    }
  }

  onArrowRight(event: Event, inputElement: HTMLInputElement): void {
    if (this.suggestions.length > 0 && inputElement.selectionStart === inputElement.value.length) {
      event.preventDefault();
      const parts = inputElement.value.trimStart().split(/\s+/);
      const cmd = parts[0];
      inputElement.value = `${ cmd } ${ this.suggestions[0] }`;
      this.inputValue = inputElement.value;
      this.suggestions = [];
      this.ghostText = '';
    }
  }

  applySuggestion(sug: string, inputElement: HTMLInputElement): void {
    const parts = inputElement.value.trimStart().split(/\s+/);
    const cmd = parts[0];
    inputElement.value = `${ cmd } ${ sug }`;
    this.inputValue = inputElement.value;
    this.suggestions = [];
    this.ghostText = '';
    inputElement.focus();
  }

  focusInput(): void {
    if (!this.isTyping && this.terminalInput) {
      this.terminalInput.nativeElement.focus();
    }
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  execute(inputElement: HTMLInputElement): void {
    const rawVal = inputElement.value.trim();
    inputElement.value = '';
    this.inputValue = '';
    this.suggestions = [];
    this.ghostText = '';

    if (!rawVal) return;

    this.history.push({ type: 'command', text: rawVal });

    const parts = rawVal.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'clear':
        this.history = [];
        break;
      case 'help':
        this.history.push({
          type: 'output',
          text: 'Available commands:\n  ls              List page files\n  cat <file>      View page summary file\n  cd <dir>        Navigate to another page\n  pwd             Print current web page URL\n  status          Show live build & uptime status\n  clear           Clear the console screen\n  help            Show this help info',
          html: `<div class="font-mono"><div class="term-cmd font-bold mb-1.5">Available commands:</div><div class="grid grid-cols-[130px_1fr] gap-y-0.5"><div><span class="term-key">ls</span></div><div class="term-muted">List page files</div><div><span class="term-key">cat &lt;file&gt;</span></div><div class="term-muted">View page summary file</div><div><span class="term-key">cd &lt;dir&gt;</span></div><div class="term-muted">Navigate to another page</div><div><span class="term-key">pwd</span></div><div class="term-muted">Print current web page URL</div><div><span class="term-key">status</span></div><div class="term-muted">Show live build &amp; uptime status</div><div><span class="term-key">clear</span></div><div class="term-muted">Clear the console screen</div><div><span class="term-key">help</span></div><div class="term-muted">Show this help info</div></div></div>`,
        });
        break;
      case 'ls':
        this.history.push({
          type: 'output',
          text: 'about.md     experience.md     stack.md     contact.md     status.md',
          html: `<span class="term-file font-semibold">about.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">experience.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">stack.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">contact.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">status.md</span>`,
        });
        break;
      case 'cat':
        this.handleCat(arg);
        break;
      case 'cd':
        this.handleCd(arg);
        break;
      case 'pwd':
        this.history.push({
          type: 'output',
          text: window.location.origin + this.router.url,
          html: `<span class="term-file underline">${ window.location.origin + this.router.url }</span>`,
        });
        break;
      case 'status':
        this.handleStatus();
        break;
      default:
        this.history.push({
          type: 'output-error',
          text: `${ cmd }: command not found. Type "help" for a list of commands.`,
          html: `<span class="text-error font-semibold">${ cmd }:</span> <span class="term-muted">command not found. Type</span> <span class="term-key font-bold">"help"</span> <span class="term-muted">for a list of commands.</span>`,
        });
    }

    this.scrollToBottom();
  }

  handleCat(arg: string): void {
    if (!arg) {
      this.history.push({ type: 'output-error', text: 'Usage: cat <filename>' });
      return;
    }

    const cleanArg = arg.trim().replace(/^\//, '').replace(/\.md$/i, '').toLowerCase();

    if (cleanArg === 'about') {
      this.history.push({
        type: 'output',
        text: 'Marc Joseph Datario\n-------------------\nLead DevOps & SRE Engineer driving modern CI/CD automation, cloud infrastructure design, and secure developer experiences.',
        html: `<div class="font-mono"><div class="term-cmd text-base font-bold">Marc Joseph Datario</div><div class="term-muted mb-1">-------------------</div><div class="term-val">Lead DevOps & SRE Engineer driving modern CI/CD automation, cloud infrastructure design, and secure developer experiences.</div></div>`,
      });
    } else if (cleanArg === 'experience' || cleanArg === 'cv') {
      this.history.push({
        type: 'output',
        text: 'Experience Summary\n------------------\n- EasyEquities PH: DevOps Engineer Lead\n- Avaloq: Senior Software Engineer (SRE)\n- PCCW Solutions: Solutions Developer\n- Business Switch Philippines Inc.: Software Engineer & DevOps Engineer',
        html: `<div class="font-mono"><div class="term-cmd font-bold">Experience Summary</div><div class="term-muted mb-1">------------------</div><div class="space-y-0.5"><div><span class="term-key">- EasyEquities PH:</span> <span class="term-val">DevOps Engineer Lead</span></div><div><span class="term-key">- Avaloq:</span> <span class="term-val">Senior Software Engineer (SRE)</span></div><div><span class="term-key">- PCCW Solutions:</span> <span class="term-val">Solutions Developer</span></div><div><span class="term-key">- Business Switch Philippines Inc.:</span> <span class="term-val">Software Engineer & DevOps Engineer</span></div></div></div>`,
      });
    } else if (cleanArg === 'stack') {
      this.history.push({
        type: 'output',
        text: 'Technology Stack\n----------------\n- Infrastructure: Terraform, AWS, Kubernetes, Helm\n- Automation: Jenkins, GitHub Actions\n- Languages: TypeScript, Python',
        html: `<div class="font-mono"><div class="term-cmd font-bold">Technology Stack</div><div class="term-muted mb-1">----------------</div><div class="space-y-0.5"><div><span class="term-key">- Infrastructure:</span> <span class="term-file">Terraform, AWS, Kubernetes, Helm</span></div><div><span class="term-key">- Automation:</span> <span class="term-file">Jenkins, GitHub Actions</span></div><div><span class="term-key">- Languages:</span> <span class="term-file">TypeScript, Python</span></div></div></div>`,
      });
    } else if (cleanArg === 'contact') {
      this.history.push({
        type: 'output',
        text: 'email: mail@datariomj.dev\nlocation: Meycauayan City, PH\navailability: OPEN_FOR_COLLABORATION\ntimezone: GMT+8',
        html: `<div class="font-mono space-y-0.5"><div><span class="term-key">email:</span> <span class="term-file underline">mail@datariomj.dev</span></div><div><span class="term-key">location:</span> <span class="term-val">Meycauayan City, PH</span></div><div><span class="term-key">availability:</span> <span class="term-badge">OPEN_FOR_COLLABORATION</span></div><div><span class="term-key">timezone:</span> <span class="term-val">GMT+8</span></div></div>`,
      });
    } else {
      this.history.push({
        type: 'output-error',
        text: `cat: ${ arg }: No such file or directory`,
        html: `<span class="text-error font-semibold">cat: ${ arg }:</span> <span class="term-muted">No such file or directory</span>`,
      });
    }
  }

  handleCd(arg: string): void {
    if (!arg || arg === '~' || arg === '/') {
      this.history.push({ type: 'output', text: 'Navigating to /about...', html: `<span class="term-cmd">Navigating to /about...</span>` });
      this.router.navigate(['/']);
      return;
    }

    // Strip leading slashes and optional .md extension (e.g. "about.md" -> "about")
    const cleanArg = arg.trim().replace(/^\//, '').replace(/\.md$/i, '').toLowerCase();

    if (cleanArg === 'about' || cleanArg === 'home') {
      this.history.push({ type: 'output', text: 'Navigating to /about...', html: `<span class="term-cmd">Navigating to /about...</span>` });
      this.router.navigate(['/']);
    } else if (cleanArg === 'experience' || cleanArg === 'cv') {
      this.history.push({ type: 'output', text: 'Navigating to /experience...', html: `<span class="term-cmd">Navigating to /experience...</span>` });
      this.router.navigate(['/experience']);
    } else if (cleanArg === 'stack') {
      this.history.push({ type: 'output', text: 'Navigating to /stack...', html: `<span class="term-cmd">Navigating to /stack...</span>` });
      this.router.navigate(['/stack']);
    } else if (cleanArg === 'contact') {
      this.history.push({ type: 'output', text: 'Navigating to /contact...', html: `<span class="term-cmd">Navigating to /contact...</span>` });
      this.router.navigate(['/contact']);
    } else {
      this.history.push({
        type: 'output-error',
        text: `cd: no such directory: ${ arg }`,
        html: `<span class="text-error font-semibold">cd:</span> <span class="term-muted">no such directory:</span> <span class="term-val font-semibold">${ arg }</span>`,
      });
    }
  }

  handleStatus(): void {
    const badges = [
      {
        label: 'build',
        value: 'CI/CD',
        indicator: 'primary',
        href: 'https://dev.azure.com/mrcjsph/datariomj/_build/latest?definitionId=5&branchName=main',
        source: 'Azure Pipelines',
      },
      {
        label: 'e2e',
        value: 'Cypress',
        indicator: 'primary',
        href: 'https://dashboard.cypress.io/projects/3zwyy9/runs',
        source: 'Cypress Dashboard',
      },
      {
        label: 'quality',
        value: 'A',
        indicator: 'secondary',
        href: 'https://app.codacy.com/gh/datariomj/datariomj/dashboard',
        source: 'Codacy',
      },
      /*
      {
        label: 'snyk',
        value: 'vulnerabilities',
        indicator: 'secondary',
        href: 'https://snyk.io/test/github/datariomj/datariomj',
        source: 'Snyk Security',
      },
      */
      {
        label: 'codecov',
        value: 'coverage',
        indicator: 'secondary',
        href: 'https://app.codecov.io/gh/datariomj/datariomj',
        source: 'Codecov',
      },
      {
        label: 'uptime',
        value: '30d ratio',
        indicator: 'primary',
        href: 'https://stats.uptimerobot.com/AGzj9HrMEo',
        source: 'UptimeRobot',
      },
      {
        label: 'version',
        value: 'latest',
        indicator: 'secondary',
        href: 'https://github.com/datariomj/datariomj/releases',
        source: 'GitHub Releases',
      },
      {
        label: 'license',
        value: 'MIT',
        indicator: 'muted',
        href: 'https://github.com/datariomj/datariomj/blob/main/LICENSE.md',
        source: 'License',
      },
    ];

    const rows = badges.map(b => {
      const dotClass = b.indicator === 'primary'
        ? 'status-dot-primary'
        : b.indicator === 'secondary'
          ? 'status-dot-secondary'
          : 'status-dot-muted';
      return `<a href="${ b.href }" target="_blank" rel="noopener noreferrer" class="status-badge-row">
  <span class="status-dot ${ dotClass }"></span>
  <span class="term-key status-label">${ b.label }</span>
  <span class="term-muted status-sep">→</span>
  <span class="term-val status-source">${ b.source }</span>
  <span class="status-link-icon">↗</span>
</a>`;
    }).join('');

    this.history.push({
      type: 'output',
      text: 'Project Status\n--------------\nbuild: CI/CD (Azure Pipelines)\ne2e: Cypress Dashboard\nquality: Codacy\ncodecov: Codecov\nuptime: UptimeRobot (30d)\nversion: GitHub Releases\nlicense: MIT',
      html: `<div class="font-mono"><div class="term-cmd font-bold mb-1.5">Project Status <span class="term-muted text-xs font-normal">(click to open)</span></div><div class="term-muted mb-2">--------------</div><div class="status-badge-list">${ rows }</div></div>`,
    });
  }

  private scrollToBottom(): void {
    if (this.terminalContent) {
      this.terminalContent.nativeElement.scrollTop = this.terminalContent.nativeElement.scrollHeight;
    }
  }
}
