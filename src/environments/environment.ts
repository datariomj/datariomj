import { NavigationLink } from '../app/shared/interfaces/navigation-link';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare const __APP_VERSION__: string | undefined;

export const environment = {
  production: false,
  version: typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.1.0-dev',
  sentryDsn: '',
  sentryEnv: 'development',
  facebook: {
    appId: '',
  },
  navigation: [
    {
      path: '/about',
      label: 'about',
      loadChildren: () => import('../app/about/about-module').then(m => m.AboutModule),
      iconClass: 'fa-user',
    },
    {
      path: '/experience',
      label: 'experience',
      loadChildren: () => import('../app/experience/experience-module').then(m => m.ExperienceModule),
      iconClass: 'fa-briefcase',
    },
    {
      path: '/stack',
      label: 'stack',
      loadChildren: () => import('../app/stack/stack.module').then(m => m.StackModule),
      iconClass: 'fa-layer-group',
    },
    // {
    //   path: '/contact',
    //   label: 'contact',
    //   loadChildren: () => import('../app/contact/contact-module').then(m => m.ContactModule),
    //   iconClass: 'fa-envelope',
    // },
  ] as NavigationLink[],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
