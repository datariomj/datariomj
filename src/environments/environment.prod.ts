import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const environment = {
  production: true,
  version: '0.1.0',
  sentryDsn: 'https://85298416f8e21dd43004da720428b762@o4511842278244352.ingest.us.sentry.io/4511847340048384',
  sentryEnv: 'production',
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
  ] as NavigationLink[],
};
