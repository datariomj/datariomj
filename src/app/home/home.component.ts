
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { SeoService } from "@core/services/seo.service";

import { TerminalHeroComponent } from "../shared/components/terminal-hero/terminal-hero.component";
import { DeploymentArchitectureComponent } from "./components/deployment-architecture/deployment-architecture.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [TerminalHeroComponent, DeploymentArchitectureComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.generateTags({
      title: "MJ Datario | Home",
      description: "Home",
      image: "/assets/images/placeholder.jpg",
      slug: "home",
    });
  }
}
