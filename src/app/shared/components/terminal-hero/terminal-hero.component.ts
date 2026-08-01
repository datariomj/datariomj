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
      this.activeCommand = this.initialCommand || `curl -I /${this.errorSlug || 'unknown-route'}`;
      this.activeOutput = this.initialOutput || [
        { type: 'output-error', text: 'HTTP/1.1 404 Not Found' },
        { type: 'output', text: `Date: ${new Date().toUTCString()}\nContent-Type: text/html; charset=UTF-8\n\n[ERROR] ROUTE_NOT_FOUND: The page you are looking for might have been removed or is temporarily unavailable.` },
      ];
    } else {
      const url = this.router.url;
      if (url.includes('experience')) {
        this.currentPath = this.initialPath || 'experience';
        this.activeCommand = this.initialCommand || 'cd /experience';
        this.activeOutput = this.initialOutput || [
          { type: 'output-success', text: 'STATUS: Loaded /experience' },
          { type: 'output', text: 'uptime: 100.0%\ndeployments_managed: >5,000\npreferred_stack: ["AWS", "Kubernetes", "Terraform"]\nfocus: High-Availability FinTech Architecture' },
        ];
      } else if (url.includes('stack')) {
        this.currentPath = this.initialPath || 'stack';
        this.activeCommand = this.initialCommand || 'cd /stack';
        this.activeOutput = this.initialOutput || [
          { type: 'output-success', text: 'STATUS: Loaded /stack' },
          { type: 'output', text: 'architecture_health: 100% HEALTHY\nactive_infra_blocks: 12/12\nzero_trust_status: SECURE\nrunning_services: Jenkins CI/CD, AWS EKS, Cloud Custodian' },
        ];
      } else if (url.includes('contact')) {
        this.currentPath = this.initialPath || 'contact';
        this.activeCommand = this.initialCommand || 'cd /contact';
        this.activeOutput = this.initialOutput || [
          { type: 'output-success', text: 'STATUS: Loaded /contact' },
          { type: 'output', text: 'email: mail@datariomj.dev\nlocation: Meycauayan City, PH\navailability: OPEN_FOR_COLLABORATION\ntimezone: GMT+8' },
        ];
      } else if (url.includes('about')) {
        this.currentPath = this.initialPath || 'about';
        this.activeCommand = this.initialCommand || 'cd /about';
        this.activeOutput = this.initialOutput || [
          { type: 'output-success', text: 'STATUS: Loaded /about' },
          { type: 'output', text: 'identity: Computer Engineering @ BSU\nspecialization: DevOps | Cloud Architect\nfocus: High-availability systems & developer enablement' },
        ];
      } else {
        // Home page default (url === '/')
        this.currentPath = this.initialPath || '';
        this.activeCommand = this.initialCommand || 'cd /';
        this.activeOutput = this.initialOutput || [
          { type: 'output-success', text: 'STATUS: Loaded /' },
          { type: 'output', text: 'whoami: Marc Joseph Datario\nrole: DevOps Engineer Lead @ EasyEquities PH\nphilosophy: "Everything as Code. Optimizing cloud infrastructure."' },
        ];
      }
    }

    this.runInitialSequence();
  }

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
        
        // Autofocus input once rendered
        setTimeout(() => {
          this.focusInput();
        }, 50);
      }
    }, 80);
  }

  printPageStatus(): void {
    this.history.push(...this.activeOutput);
    this.history.push({ type: 'output', text: 'Type "help" to view available commands.' });
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
      inputElement.value = `${cmd} ${this.suggestions[0]}`;
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
      inputElement.value = `${cmd} ${this.suggestions[0]}`;
      this.inputValue = inputElement.value;
      this.suggestions = [];
      this.ghostText = '';
    }
  }

  applySuggestion(sug: string, inputElement: HTMLInputElement): void {
    const parts = inputElement.value.trimStart().split(/\s+/);
    const cmd = parts[0];
    inputElement.value = `${cmd} ${sug}`;
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
          text: 'Available commands:\n  ls              List page files\n  cat <file>      View page summary file\n  cd <dir>        Navigate to another page\n  pwd             Print current web page URL\n  clear           Clear the console screen\n  help            Show this help info',
          html: `<div class="font-mono"><div class="term-cmd font-bold mb-1.5">Available commands:</div><div class="grid grid-cols-[130px_1fr] gap-y-0.5"><div><span class="term-key">ls</span></div><div class="term-muted">List page files</div><div><span class="term-key">cat &lt;file&gt;</span></div><div class="term-muted">View page summary file</div><div><span class="term-key">cd &lt;dir&gt;</span></div><div class="term-muted">Navigate to another page</div><div><span class="term-key">pwd</span></div><div class="term-muted">Print current web page URL</div><div><span class="term-key">clear</span></div><div class="term-muted">Clear the console screen</div><div><span class="term-key">help</span></div><div class="term-muted">Show this help info</div></div></div>`,
        });
        break;
      case 'ls':
        this.history.push({
          type: 'output',
          text: 'about.md     experience.md     stack.md     contact.md',
          html: `<span class="term-file font-semibold">about.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">experience.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">stack.md</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="term-file font-semibold">contact.md</span>`,
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
          html: `<span class="term-file underline">${window.location.origin + this.router.url}</span>`,
        });
        break;
      default:
        this.history.push({
          type: 'output-error',
          text: `${cmd}: command not found. Type "help" for a list of commands.`,
          html: `<span class="text-error font-semibold">${cmd}:</span> <span class="term-muted">command not found. Type</span> <span class="term-key font-bold">"help"</span> <span class="term-muted">for a list of commands.</span>`,
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
        text: `cat: ${arg}: No such file or directory`,
        html: `<span class="text-error font-semibold">cat: ${arg}:</span> <span class="term-muted">No such file or directory</span>`,
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
        text: `cd: no such directory: ${arg}`,
        html: `<span class="text-error font-semibold">cd:</span> <span class="term-muted">no such directory:</span> <span class="term-val font-semibold">${arg}</span>`,
      });
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.terminalContent) {
        this.terminalContent.nativeElement.scrollTop = this.terminalContent.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
