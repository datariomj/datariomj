import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";

export interface BootLogItem {
  timestamp: string;
  message: string;
  status: "OK" | "INFO" | "READY";
}

@Component({
  selector: "app-preloader",
  standalone: true,
  imports: [],
  templateUrl: "./preloader.component.html",
  styleUrls: ["./preloader.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private timer: ReturnType<typeof setInterval> | null = null;

  progress = 0;
  displayedLogs: BootLogItem[] = [];

  private bootLogs: BootLogItem[] = [
    { timestamp: "0.001s", message: "INITIALIZING DATARIOMJ_OS KERNEL...", status: "OK" },
    { timestamp: "0.014s", message: "CONNECTING CLOUD INFRASTRUCTURE (AWS/EKS)...", status: "OK" },
    { timestamp: "0.032s", message: "VERIFYING ZERO-TRUST SECURITY POLICIES...", status: "OK" },
    { timestamp: "0.048s", message: "LOADING SYSTEM MODULES [/about, /experience, /stack]...", status: "OK" },
    { timestamp: "0.065s", message: "SYSTEM DIAGNOSTICS CLEAN -> READY", status: "READY" },
  ];

  ngOnInit(): void {
    this.runBootSequence();
  }

  runBootSequence(): void {
    let index = 0;
    const intervalTime = 100;

    this.timer = setInterval(() => {
      if (index < this.bootLogs.length) {
        this.displayedLogs.push(this.bootLogs[index]);
        index++;
        this.progress = Math.min(100, Math.round((index / this.bootLogs.length) * 100));
        this.cdr.markForCheck();
      } else {
        if (this.timer) clearInterval(this.timer);
        this.progress = 100;
        this.cdr.markForCheck();
      }
    }, intervalTime);
  }

  ngOnDestroy(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }
}
