
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = Math.max(new Date().getFullYear(), 2021);
}
