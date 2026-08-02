import { LoadChildrenCallback } from '@angular/router';

export interface NavigationLink {
  path: string;
  label: string;
  loadChildren: LoadChildrenCallback;
  iconClass: string;
}
