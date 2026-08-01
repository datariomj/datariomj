import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-unfinished",
  standalone: true,
  imports: [],
  templateUrl: "./unfinished.component.html",
  styleUrls: ["./unfinished.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnfinishedComponent {}
