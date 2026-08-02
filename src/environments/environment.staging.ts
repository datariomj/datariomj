import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const environment = {
  production: false,
  version: '0.1.0',
  facebook: {
    appId: '2167184696673703',
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
    {
      path: '/contact',
      label: 'contact',
      loadChildren: () => import('../app/contact/contact-module').then(m => m.ContactModule),
      iconClass: 'fa-envelope',
    },
  ] as NavigationLink[],
};
