import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as stackJson from '../../assets/json/stack.json';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StackComponent implements OnInit {
  stackData = [];

  constructor() { }

  ngOnInit(): void {
  }

}
