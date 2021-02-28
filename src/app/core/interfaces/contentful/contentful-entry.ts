import { ContentfulSys } from './contentful-sys';

export interface ContentfulEntry<T> {
  sys: ContentfulSys;
  field: T;
}

