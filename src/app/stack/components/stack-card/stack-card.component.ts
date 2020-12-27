import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stack-card',
  templateUrl: './stack-card.component.html',
  styleUrls: ['./stack-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StackCardComponent implements OnInit {
  @Input()
  stackData!: {
    name: string;
    symbol: string;
    yearStarted: number;
    icon?: string;
    tags: string[];
  };

  constructor() { }

  ngOnInit(): void {
  }

}
