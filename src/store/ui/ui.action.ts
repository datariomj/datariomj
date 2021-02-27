export class ToggleSidenav {
  public static readonly type = '[App] Toggle Sidenav';

  constructor() { };
}

export class PreloaderVisibility {
  public static readonly type = '[App] Preloader Visibility';

  constructor(public showPreloader: boolean) { };
}
